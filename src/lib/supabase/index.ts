import { auth } from '$lib/firebase';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
	import.meta.env.VITE_SUPABASE_URL as string,
	import.meta.env.VITE_SUPABASE_ANON_KEY as string,
	{
    global: {
      fetch: (...args) => fetch(...args),
    },
    accessToken: async () => {
      const user = auth.currentUser;
      if (user) {
        return await user.getIdToken(false);
      }
      return null;
    },
  }
);