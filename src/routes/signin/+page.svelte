<svelte:head>
  <title>Sign In — Parsnip</title>
</svelte:head>

<script lang="ts">
  import { auth } from '$lib/firebase';
  import {
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
  } from 'firebase/auth';
  import { goto } from '$app/navigation';

  let email = $state('');
  let password = $state('');
  let loading = $state(false);
  let googleLoading = $state(false);
  let error = $state('');

  const errorMessages: Record<string, string> = {
    'auth/invalid-credential': 'Invalid email or password.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/popup-closed-by-user': 'Sign-in cancelled.',
  };

  function getErrorMessage(code: string) {
    return errorMessages[code] ?? 'Something went wrong. Please try again.';
  }

  async function handleEmailSignIn(e: SubmitEvent) {
    e.preventDefault();
    error = '';
    loading = true;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      goto('/');
    } catch (err: any) {
      error = getErrorMessage(err.code);
    } finally {
      loading = false;
    }
  }

  async function handleGoogleSignIn() {
    error = '';
    googleLoading = true;
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      goto('/');
    } catch (err: any) {
      error = getErrorMessage(err.code);
    } finally {
      googleLoading = false;
    }
  }
</script>

<div class="min-h-[calc(100vh-8rem)] flex items-center justify-center px-6 py-16">
  <div class="w-full max-w-sm">

    <div class="text-center mb-8">
      <div class="text-5xl mb-4">🌿</div>
      <h1 class="font-display text-3xl font-bold text-base-content">Welcome back</h1>
      <p class="text-base-content/60 mt-2">Sign in to continue cooking</p>
    </div>

    <div class="card bg-base-200 border border-base-300 shadow-sm">
      <div class="card-body gap-4">

        {#if error}
          <div class="alert alert-error text-sm py-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
            <span>{error}</span>
          </div>
        {/if}

        <form onsubmit={handleEmailSignIn} class="flex flex-col gap-4">
          <div class="form-control gap-1">
            <label class="label py-0" for="email">
              <span class="label-text text-sm font-medium">Email</span>
            </label>
            <input
              id="email"
              type="email"
              class="input input-bordered bg-base-100 focus:input-primary"
              placeholder="you@example.com"
              bind:value={email}
              required
              autocomplete="email"
            />
          </div>

          <div class="form-control gap-1">
            <label class="label py-0" for="password">
              <span class="label-text text-sm font-medium">Password</span>
            </label>
            <input
              id="password"
              type="password"
              class="input input-bordered bg-base-100 focus:input-primary"
              placeholder="••••••••"
              bind:value={password}
              required
              autocomplete="current-password"
            />
            <div class="label py-0 justify-end">
              <a href="/forgot-password" class="label-text-alt link link-hover text-base-content/50">
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            class="btn btn-primary rounded-full w-full mt-1"
            disabled={loading || googleLoading}
          >
            {#if loading}
              <span class="loading loading-spinner loading-sm"></span>
              Signing in…
            {:else}
              Sign in
            {/if}
          </button>
        </form>

        <div class="divider text-base-content/40 text-xs my-0">or</div>

        <button
          type="button"
          class="btn btn-outline rounded-full w-full gap-2"
          onclick={handleGoogleSignIn}
          disabled={loading || googleLoading}
        >
          {#if googleLoading}
            <span class="loading loading-spinner loading-sm"></span>
            Signing in…
          {:else}
            <svg class="h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          {/if}
        </button>

      </div>
    </div>

    <p class="text-center text-sm text-base-content/60 mt-6">
      Don't have an account?
      <a href="/signup" class="link link-primary font-medium">Sign up</a>
    </p>

  </div>
</div>
