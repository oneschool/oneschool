import TheNavBar from '../components/TheNavBar.js';

const Home = {
    render : async () => {
        // Always remember to run all the after_render functions 
        // of loaded components in after_render method of the page
        
        const view =  /*html*/`
            <div style="display: none;" id="gtd-banner" class="bg-indigo-600">
                <div class="max-w-screen-xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
                    <div class="flex items-center justify-between flex-wrap">
                    <div class="w-0 flex-1 flex items-center">
                        <span class="flex p-2 rounded-lg bg-indigo-800">
                        <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                        </svg>
                        </span>
                        <p class="ml-3 font-medium text-white truncate">
                        <span class="hidden md:inline">
                            Hey! You are already logged in.
                        </span>
                        </p>
                    </div>
                    <div class="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                        <div class="rounded-md shadow-sm">
                        <a href="#/app" class="flex items-center justify-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-indigo-600 bg-white hover:text-indigo-500 focus:outline-none focus:shadow-outline transition ease-in-out duration-150">
                            Go To Dashboard
                        </a>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            <div class="relative bg-white overflow-hidden">
            <div class="hidden lg:block lg:absolute lg:inset-0">
                <svg class="absolute top-0 left-1/2 transform translate-x-64 -translate-y-8" width="640" height="784" fill="none" viewBox="0 0 640 784">
                <defs>
                    <pattern id="9ebea6f4-a1f5-4d96-8c4e-4c2abf658047" x="118" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
                    </pattern>
                </defs>
                <rect y="72" width="640" height="640" class="text-gray-50" fill="currentColor" />
                <rect x="118" width="404" height="784" fill="url(#9ebea6f4-a1f5-4d96-8c4e-4c2abf658047)" />
                </svg>
            </div>
            <div class="relative pt-6 pb-16 md:pb-20 lg:pb-24 xl:pb-32">
                <nav class="relative max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-6">
                <div class="flex items-center flex-1">
                    <div class="flex items-center justify-between w-full md:w-auto">
                    <a href="#" aria-label="Home">
                        <img class="h-8 w-auto sm:h-8" src="img/oneschool.svg" alt="Logo">
                    </a>

                    </div>
                </div>
                <div id="sign-in-btn" class="md:block text-right" style="display: none;">
                    <span class="inline-flex rounded-md shadow-md">
                    <span class="inline-flex rounded-md shadow-xs">
                        <a href="#/login" class="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo transition duration-150 ease-in-out">
                        Sign in
                        </a>
                    </span>
                    </span>
                </div>
                <div id="sign-out-btn" class="md:block text-right" style="display: none;">
                    <span class="inline-flex rounded-md shadow-md">
                    <span class="inline-flex rounded-md shadow-xs">
                        <a href="#" class="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo transition duration-150 ease-in-out">
                        Sign out
                        </a>
                    </span>
                    </span>
                </div>
                </nav>
                </div>
                <main class="mt-8 mx-auto max-w-screen-xl px-4 sm:mt-4 sm:px-6 md:mt-6 xl:mt-8">
                <div class="lg:grid lg:grid-cols-12 lg:gap-8">
                    <div class="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                    <div class="text-sm font-semibold uppercase tracking-wide text-gray-500 sm:text-base lg:text-sm xl:text-base">
                        Coming soon
                    </div>
                    <h2 class="mt-1 text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:leading-none sm:text-6xl lg:text-5xl xl:text-6xl">
                        Built for students
                        <br class="hidden md:inline">
                        <span class="text-indigo-600">and educators</span>
                    </h2>
                    <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                        OneSchool is a platform inspired by the way we learn. From schools to colleges, you teach in your classrooms at the ease of our mulitple products.
                    </p>
                    <div class="mt-5 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                        <p class="text-base font-medium text-gray-900">
                        Sign up to get notified when it’s ready.
                        </p>
                        <form action="#" method="POST" class="mt-3 sm:flex">
                        <input aria-label="Email" class="appearance-none block w-full px-3 py-3 border border-gray-300 text-base leading-6 rounded-md placeholder-gray-500 shadow-sm focus:outline-none focus:placeholder-gray-400 focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:flex-1" placeholder="Enter your email">
                        <button type="submit" class="mt-3 w-full px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-gray-800 shadow-sm hover:bg-gray-700 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray active:bg-gray-900 transition duration-150 ease-in-out sm:mt-0 sm:ml-3 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto">
                            Notify me
                        </button>
                        </form>
                        <p class="mt-3 text-sm leading-5 text-gray-500">
                        We care about the protection of your data. Read our
                        <a href="#" class="font-medium text-gray-900 underline">Privacy Policy</a>.
                        </p>
                    </div>
                    </div>
                    <div class="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                    <svg class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 scale-75 origin-top sm:scale-100 lg:hidden" width="640" height="784" fill="none" viewBox="0 0 640 784">
                        <defs>
                        <pattern id="4f4f415c-a0e9-44c2-9601-6ded5a34a13e" x="118" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
                        </pattern>
                        </defs>
                        <rect y="72" width="640" height="640" class="text-gray-50" fill="currentColor" />
                        <rect x="118" width="404" height="784" fill="url(#4f4f415c-a0e9-44c2-9601-6ded5a34a13e)" />
                    </svg>
                    <div class="relative mx-auto w-full rounded-lg lg:max-w-md">
                        <img class="w-full" src="img/home.svg" alt="Woman making a sale">
                    </div>
                    </div>
                </div>
                </main>
            </div>
            </div>
        `
        return view
    },
    after_render: async () => {
        // after_render of components loaded in the page
        const signOutBtn = null || document.querySelector("#sign-out-btn");
        const signInBtn = null || document.querySelector("#sign-in-btn")
        const gtdBanner = null || document.querySelector("#gtd-banner");

        // listener for auth status
        auth.onAuthStateChanged((user) => {
            user ? showSignOutBtn() : showSignInBtn();
        })

        // only one button will be visible at a time
        // hide sign out
        const showSignInBtn = () => {
            signOutBtn.style.display = "none";
            signInBtn.style.display = "";
            gtdBanner.style.display = "none";
        }

        // hide sign in
        const showSignOutBtn = () => {
            signInBtn.style.display = "none";
            signOutBtn.style.display = "";
            gtdBanner.style.display = "";
        }

        // signout user
        signOutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            gtdBanner.style.display = "none";
            auth.signOut().then(() => {
                console.debug("user signed out");
                localStorage.removeItem("user@os");
            })
        })

    }
}

export default Home;