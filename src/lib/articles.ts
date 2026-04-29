export type ArticleCategory = 'ingredients' | 'techniques' | 'tips';

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  readTime: number;
  body: Section[];
}

export interface Section {
  heading?: string;
  text: string;
}

export const articleCategories: { id: ArticleCategory; name: string; emoji: string }[] = [
  { id: 'ingredients', name: 'Choosing Ingredients', emoji: '🛒' },
  { id: 'techniques',  name: 'Cooking Techniques',   emoji: '🔪' },
  { id: 'tips',        name: 'Kitchen Tips',          emoji: '💡' },
];

export const articles: Article[] = [
  {
    slug: 'how-to-pick-fresh-vegetables',
    title: 'How to Pick Fresh Vegetables at the Market',
    excerpt: 'A quick guide to spotting the best produce — what to look for, what to avoid, and why it matters for your cooking.',
    category: 'ingredients',
    readTime: 4,
    body: [
      { text: 'Great cooking starts before you turn on the stove. The quality of your vegetables shapes the flavour of every dish — no amount of seasoning fixes a bad tomato.' },
      { heading: 'Look, smell, feel', text: 'Use all your senses. Fresh vegetables are firm to the touch (with the exception of ripe avocados and tomatoes). Leaves should be crisp, not limp. Smell cut surfaces — they should smell like the vegetable itself, not musty or fermented.' },
      { heading: 'Colour signals ripeness', text: 'Deep, saturated colour usually means higher nutrient content and better flavour. Pale or blotchy skin can indicate cold damage or uneven ripening. Exception: heirloom tomatoes and varieties that are naturally striped or pale.' },
      { heading: 'Weight matters', text: 'Pick up the vegetable — heavier means more water content and freshness. A cabbage that feels light for its size has started to dry out inside. Same goes for cucumbers, citrus, and root vegetables.' },
      { heading: 'Avoid these signs', text: 'Pass on anything with soft spots, mould, cracks, or an unpleasant smell. With leafy greens, yellowing edges mean they\'re past their prime. With root vegetables, avoid anything that\'s starting to sprout — it means sugars are converting and the flavour has dropped.' },
    ],
  },
  {
    slug: 'choosing-the-right-meat',
    title: 'Choosing the Right Cut of Meat',
    excerpt: 'Not all cuts are equal — learn which cuts work best for roasting, braising, grilling, and quick pan-frying.',
    category: 'ingredients',
    readTime: 5,
    body: [
      { text: 'The single biggest mistake home cooks make with meat is using the wrong cut for the cooking method. A cheap braise cut grilled over high heat becomes shoe leather. The same cut slow-cooked for three hours becomes silk.' },
      { heading: 'Tender cuts — fast heat', text: 'Muscles that do little work (loin, rib, tenderloin) are naturally tender and suit dry-heat methods: grilling, roasting, pan-frying. They cook fast and dry out if overcooked.' },
      { heading: 'Tough cuts — slow heat', text: 'Shoulder, shank, brisket, and cheeks come from hardworking muscles full of collagen. Low and slow cooking (braising, stewing) melts the collagen into gelatin — that\'s what makes a braise feel rich and sticky.' },
      { heading: 'What to look for visually', text: 'Look for a deep red colour (not grey or brown), fine marbling throughout the meat, and white (not yellow) fat. Meat should be firm to the touch and not sitting in excess liquid at the bottom of the packaging.' },
      { heading: 'Ask your butcher', text: 'Butchers are an underused resource. Tell them what you\'re making — they\'ll recommend the right cut and often prep it for you. A whole shoulder butterflied for the grill, or a shank tied for presentation — these take 30 seconds for a butcher and make a big difference.' },
    ],
  },
  {
    slug: 'reading-olive-oil-labels',
    title: 'What "Extra Virgin" Actually Means on Olive Oil',
    excerpt: 'The olive oil aisle is confusing. Here\'s what the labels mean and which bottle is actually worth buying.',
    category: 'ingredients',
    readTime: 3,
    body: [
      { text: 'Olive oil labelling is one of the most confusing in the grocery store. "Extra virgin", "pure", "light", "cold pressed" — here\'s what each actually means.' },
      { heading: 'Extra virgin (EVOO)', text: 'This is the highest grade. It\'s pressed from fresh olives without heat or chemicals, and has less than 0.8% acidity. It should taste of something — grassy, peppery, fruity. If it tastes like nothing, it\'s old or poor quality. Use for dressings, finishing, and lower-heat cooking.' },
      { heading: '"Pure" or "Classic" olive oil', text: 'This is refined olive oil blended with a small amount of virgin olive oil for colour and flavour. It has a higher smoke point than EVOO and a neutral flavour — fine for everyday sautéing.' },
      { heading: '"Light" olive oil', text: '"Light" refers to flavour, not calories. It\'s heavily refined with almost no olive character. Good smoke point, neutral taste. Use when you want the cooking fat to be invisible.' },
      { heading: 'How to store it', text: 'Keep olive oil away from heat and light. A dark cupboard away from the stove is ideal. Buy in quantities you\'ll use within 3–4 months of opening — olive oil goes stale.' },
    ],
  },
  {
    slug: 'the-maillard-reaction',
    title: 'The Maillard Reaction: Why Browning Changes Everything',
    excerpt: 'That golden crust on your steak or bread isn\'t just colour — it\'s hundreds of new flavour compounds being created in real time.',
    category: 'techniques',
    readTime: 4,
    body: [
      { text: 'The Maillard reaction is arguably the most important chemical process in cooking. It\'s what turns a pale piece of chicken into something golden and complex — and understanding it makes you a dramatically better cook.' },
      { heading: 'What it is', text: 'Above 140–165°C, amino acids and reducing sugars react to form hundreds of new flavour and aroma compounds. It\'s why bread has a crust, steak has a sear, and coffee has roasted notes. It\'s not caramelisation (which is sugar-only) — it requires protein.' },
      { heading: 'Dry surface = better browning', text: 'Water boils at 100°C. As long as there\'s surface moisture, the temperature at the surface can\'t exceed 100°C — no Maillard reaction. Pat meat and vegetables dry before cooking. Salt proteins in advance so surface moisture draws out and evaporates.' },
      { heading: 'Hot pan, don\'t crowd', text: 'A hot pan starts browning immediately. Crowding lowers the pan temperature and traps steam — you\'ll steam instead of sear. Cook in batches if needed.' },
      { heading: 'Don\'t move it', text: 'The crust releases naturally when it\'s ready. If you try to lift meat and it sticks, it\'s not done building its crust. Wait another 30 seconds and try again — it will release cleanly.' },
    ],
  },
  {
    slug: 'how-to-braise',
    title: 'Braising: The Technique That Transforms Tough Cuts',
    excerpt: 'Low heat, a lid, and a little liquid — learn the method that turns the cheapest cuts into the most flavourful meals.',
    category: 'techniques',
    readTime: 5,
    body: [
      { text: 'Braising is a slow, moist-heat method that works by breaking down collagen in tough muscle cuts into gelatin. The result is meat so tender it falls apart, surrounded by a silky, reduced sauce.' },
      { heading: 'The basic method', text: 'Sear the meat on all sides in a heavy pot (Dutch oven is ideal). Remove the meat, sauté aromatics (onion, carrot, celery) in the same fat. Deglaze with wine or stock, scraping up the fond. Return the meat, add enough liquid to come halfway up (not fully cover), put the lid on, and cook low and slow — 140–160°C in the oven, or the lowest gas flame with a heavy lid.' },
      { heading: 'The liquid matters', text: 'Use stock, wine, beer, tomatoes, or a combination. The braising liquid becomes your sauce — so use something you\'d want to drink. Avoid plain water unless you have a very well-seasoned braise.' },
      { heading: 'Time and temperature', text: 'Resist the urge to rush a braise with higher heat. Collagen breaks down slowly and needs gentle, consistent heat. A shoulder of lamb at 150°C for 4 hours is transformative. At 200°C for 2 hours, it will be dry and stringy.' },
      { heading: 'Finishing the sauce', text: 'Once the meat is done, remove it to rest. Strain the braising liquid and reduce it in the pot over medium-high heat until it coats a spoon. Taste and adjust seasoning. This concentrated sauce is the reward for patient cooking.' },
    ],
  },
  {
    slug: 'knife-skills-basics',
    title: 'Knife Skills: The 3 Cuts Every Cook Needs',
    excerpt: 'You don\'t need to dice like a chef in a movie. You need three cuts done safely and consistently.',
    category: 'techniques',
    readTime: 4,
    body: [
      { text: 'Most home cooks use one cut for everything — a rough chop. Learning three proper cuts makes your cooking faster, safer, and more even (which means food cooks more evenly too).' },
      { heading: 'The slice', text: 'Use the full length of the blade in a long, forward-and-down motion. Don\'t just press down — drag the blade forward as you cut. Ideal for onions, cabbage, and herbs. Keep your fingers curled in the "claw grip" — knuckles forward, fingertips tucked.' },
      { heading: 'The dice', text: 'Make horizontal cuts (parallel to the board), then vertical cuts, then crosscuts. The horizontal cuts are what most people skip — they\'re what creates even cubes. Start with onions: cut in half root-to-tip, make radial cuts toward the root (don\'t cut through the root), then crosscut.' },
      { heading: 'The chiffonade', text: 'Stack leafy herbs or greens, roll them into a tight cylinder, and slice across the roll into thin ribbons. The fastest way to prep basil, mint, or spinach without bruising the leaves.' },
      { heading: 'Keep the knife sharp', text: 'A dull knife is more dangerous than a sharp one — it requires more force, which means more chance of slipping. Hone your knife before every use (the steel realigns the edge). Sharpen it properly every few months.' },
    ],
  },
  {
    slug: 'salt-when-and-how',
    title: 'Seasoning with Salt: When to Add It and How Much',
    excerpt: 'Salt isn\'t just about making food salty. Used at the right moment, it transforms texture, draws out flavour, and builds depth.',
    category: 'tips',
    readTime: 4,
    body: [
      { text: 'Salt is the most important seasoning in cooking — and the most misunderstood. "Add salt to taste at the end" is incomplete advice. Salt does different things at different stages of cooking.' },
      { heading: 'Salt early, salt often', text: 'Seasoning in layers — at each stage of cooking — builds more complex flavour than a single large dose at the end. Season the base (onions, garlic) when you add them, season the protein before it hits the pan, taste and adjust as the dish builds.' },
      { heading: 'Salting meat in advance', text: 'Salt draws moisture to the surface. If you salt 1–2 hours before cooking (or overnight in the fridge), that moisture is reabsorbed along with dissolved salt — seasoning the meat from within, not just the surface. 10 minutes before cooking is the worst window: you draw moisture out without it being reabsorbed.' },
      { heading: 'Salting pasta water', text: 'The water should taste like the sea — properly salted pasta water seasons the pasta from the outside in. It\'s not about sodium — most of the salt stays in the water. Under-salted pasta water is one of the most common home cook mistakes.' },
      { heading: 'Which salt to use', text: 'Fine table salt for baking (consistent measurement). Kosher salt or coarse sea salt for cooking (easier to pinch and control). Flaky sea salt (Maldon, fleur de sel) for finishing — it adds texture and a burst of mineral flavour that fine salt doesn\'t.' },
    ],
  },
  {
    slug: 'pan-temperature-guide',
    title: 'How Hot Should Your Pan Be? A Practical Guide',
    excerpt: 'Getting your pan to the right temperature before adding food is a skill that changes everything — here\'s how to read the heat.',
    category: 'tips',
    readTime: 3,
    body: [
      { text: 'Cooking in a pan that\'s too cold is one of the most common reasons food sticks, steams instead of browns, and tastes flat. Learning to read your pan\'s heat takes practice but pays off immediately.' },
      { heading: 'Heat the pan first', text: 'Place an empty pan over medium to medium-high heat for 1–3 minutes before adding fat. An exception: eggs start in a cold pan with butter. For everything else — heat the pan first.' },
      { heading: 'The water drop test', text: 'Flick a drop of water into the pan. Below 100°C: it sizzles and evaporates slowly. At 150–180°C: it sizzles and evaporates quickly. At 190–220°C (Leidenfrost point): the drop beads up and skitters around the surface. That\'s your searing temperature.' },
      { heading: 'Add fat to a hot pan', text: 'Oil or butter added to an already-hot pan heats up fast and spreads evenly. You\'ll see it shimmer (for oil) or foam and then calm down (for butter) — that\'s your cue to add the food.' },
      { heading: 'Adjust as you cook', text: 'Once food goes in, the pan temperature drops. Turn the heat up slightly to compensate, then back down once things are cooking steadily. Cast iron holds heat better than thin stainless; thin pans respond faster to heat changes.' },
    ],
  },
  {
    slug: 'building-flavour-foundations',
    title: 'Flavour Foundations: Aromatics and the Holy Trinity',
    excerpt: 'Every cuisine has a base of aromatics that defines its flavour. Understanding these combinations unlocks whole new regions of cooking.',
    category: 'tips',
    readTime: 4,
    body: [
      { text: 'The foundation of most savoury dishes is a combination of aromatics — vegetables and herbs cooked low and slow in fat to release their flavour before anything else goes in the pan. Get this right and everything built on top tastes better.' },
      { heading: 'The French mirepoix', text: 'Onion, carrot, celery — roughly 2:1:1. The base of soups, stocks, braises, and sauces across French cuisine. Cooked low and slow in butter until soft but not coloured.' },
      { heading: 'The Italian soffritto', text: 'Same three vegetables as mirepoix but finely diced and cooked until completely soft and slightly golden in olive oil. Garlic is often added. The base of pasta sauces, risotto, and braises.' },
      { heading: 'The Cajun holy trinity', text: 'Onion, celery, and green bell pepper (no carrot). The base of gumbo, jambalaya, and étouffée. Cooked in fat until very soft before adding proteins and roux.' },
      { heading: 'Asian aromatics', text: 'Many Chinese and Southeast Asian dishes start with ginger, garlic, and scallions — stir-fried briefly in hot oil to bloom their flavour. Some Korean and Japanese dishes add sesame oil and fermented pastes at this stage. The principle is the same: fat + heat + aromatics = flavour foundation.' },
    ],
  },
];
