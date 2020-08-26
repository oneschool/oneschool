import TheFooter from "../components/TheFooter.js";

const Home = {
    render : async () => {
        // Always remember to run all the after_render functions 
        // of loaded components in after_render method of the page
        const Footer = await TheFooter.render();
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
            <div class="bg-white">
                <div class="max-w-screen-xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
                    <div class="space-y-12">
                    <div class="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
                        <h2 class="text-3xl leading-9 font-extrabold tracking-tight sm:text-4xl">Meet our team</h2>
                        <p class="text-xl leading-7 text-gray-500">A bunch of caffeinated coders, that's about it. Do send us a linkedin request, we'd love to connect.</p>
                    </div>
                    <ul class="mx-auto space-y-16 sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 lg:grid-cols-3 lg:max-w-5xl">
                        <li>
                        <div class="space-y-6">
                            <img class="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56" src="img/ambika.jpeg" alt="">
                            <div class="space-y-2">
                            <div class="text-lg leading-6 font-medium space-y-1">
                                <h4>Ambika</h4>
                                <p class="text-indigo-600">Ex - LinkedIn</p>
                            </div>
                            <ul class="flex justify-center space-x-5">
                                <li>
                                <a href="https://github.com/Ambika55" class="text-gray-400 hover:text-gray-500 transition ease-in-out duration-150">
                                    <span class="sr-only">github</span>
                                    <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path>
                                    </svg>
                                </a>
                                </li>
                                <li>
                                <a href="https://www.linkedin.com/in/ambika55/" class="text-gray-400 hover:text-gray-500 transition ease-in-out duration-150">
                                    <span class="sr-only">LinkedIn</span>
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clip-rule="evenodd" />
                                    </svg>
                                </a>
                                </li>
                            </ul>
                            </div>
                        </div>
                        </li>

                        <li>
                        <div class="space-y-6">
                            <img class="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56" src="img/arijit.jpeg" alt="">
                            <div class="space-y-2">
                            <div class="text-lg leading-6 font-medium space-y-1">
                                <h4>Arijit Mallik</h4>
                                <p class="text-indigo-600">Project Advisor</p>
                                <p class="text-indigo-600">Software Engineer, Google</p>
                            </div>
                            <ul class="flex justify-center space-x-5">
                            <li>

                                <li>
                                <a href="https://www.linkedin.com/in/arijit-mallik-b966ba68/" class="text-gray-400 hover:text-gray-500 transition ease-in-out duration-150">
                                    <span class="sr-only">LinkedIn</span>
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clip-rule="evenodd" />
                                    </svg>
                                </a>
                                </li>
                            </ul>
                            </div>
                        </div>
                        </li>

                        <li>
                        <div class="space-y-6">
                            <img class="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56" src="img/tanya.jpeg" alt="">
                            <div class="space-y-2">
                            <div class="text-lg leading-6 font-medium space-y-1">
                                <h4>Tanya</h4>
                                <p class="text-indigo-600">Ex - UBS</p>
                            </div>
                            <ul class="flex justify-center space-x-5">
                                    <a href="https://github.com/17tanya" class="text-gray-400 hover:text-gray-500 transition ease-in-out duration-150">
                                    <span class="sr-only">github</span>
                                    <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path>
                                    </svg>
                                </a>
                                </li>
                                <li>
                                <a href="https://www.linkedin.com/in/tanya-sikarwar-545545173/" class="text-gray-400 hover:text-gray-500 transition ease-in-out duration-150">
                                    <span class="sr-only">LinkedIn</span>
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clip-rule="evenodd" />
                                    </svg>
                                </a>
                                </li>
                            </ul>
                            </div>
                        </div>
                        </li>

                        <li>
                        <div class="space-y-6">
                            <img class="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56" src="img/karn.png" alt="">
                            <div class="space-y-2">
                            <div class="text-lg leading-6 font-medium space-y-1">
                                <h4>Gyan Prakash Karn</h4>
                                <p class="text-indigo-600">Intern @ SendX</p>  
                                <p class="text-indigo-600">Ex - Amazon, Ex - CrioDo</p>
                            </div>  
                            <ul class="flex justify-center space-x-5">
                            <a href="https://github.com/karngyan" class="text-gray-400 hover:text-gray-500 transition ease-in-out duration-150">
                            <span class="sr-only">github</span>
                            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path>
                            </svg>
                        </a>
                        </li>
                                <li>
                                <a href="https://linkedin.com/in/karngyan" class="text-gray-400 hover:text-gray-500 transition ease-in-out duration-150">
                                    <span class="sr-only">LinkedIn</span>
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clip-rule="evenodd" />
                                    </svg>
                                </a>
                                </li>
                            </ul>
                            </div>
                        </div>
                        </li>

                        <li>
                        <div class="space-y-6">
                        <a href="https://github.com/oneschool/oneschool">
                            <img class="mx-auto h-40 w-40  xl:w-56 xl:h-56" src="img/octocat.png" alt="">
                            <div class="space-y-2">
                            <div class="text-lg leading-6 font-medium space-y-1">
                                <h4>Octocat</h4>
                                <p class="text-indigo-600">OneSchool Repository</p>
                            </div>
                            </div>
                        </a>
                        </div>
                        </li>

                        <li>
                        <div class="space-y-6">
                            <img class="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56" src="img/puneet.jpeg" alt="">
                            <div class="space-y-2">
                            <div class="text-lg leading-6 font-medium space-y-1">
                                <h4>Puneet Rai</h4>
                                <p class="text-indigo-600">Intern @ CrioDo</p>
                                <p class="text-indigo-600">Ex - Microsoft</p>   
                            </div>
                            <ul class="flex justify-center space-x-5">
                            <a href="https://github.com/rpuneet" class="text-gray-400 hover:text-gray-500 transition ease-in-out duration-150">
                            <span class="sr-only">github</span>
                            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path>
                            </svg>
                        </a>
                        </li>
                                <li>
                                <a href="https://www.linkedin.com/in/rpuneet/" class="text-gray-400 hover:text-gray-500 transition ease-in-out duration-150">
                                    <span class="sr-only">LinkedIn</span>
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clip-rule="evenodd" />
                                    </svg>
                                </a>
                                </li>
                            </ul>
                            </div>
                        </div>
                        </li>
                    </ul>
                    </div>
                </div>
                </div>

            ${Footer}
        `
        return view
    },
    after_render: async () => {
        // after render of all function calls
        await TheFooter.after_render();

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