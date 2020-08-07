const Login = {
    render : async () => {
        const view =  /*html*/`
            <div class="w-full flex flex-col content-center items-center justify-center">
                <a href="/#" class="py-10">
                    <p class="text-blue font-semibold text-4xl">oneschool</p>
                </a>
                <form class="bg-white w-2/4 max-w-sm  shadow-md rounded px-8 py-12 pt-6 pb-8 mb-4">
                    <div class="mb-4">
                        <p class="block text-darkgrey text-sm py-1" for="email">
                        Sign in to your account
                        </p>
                    </div>
                    <div class="mb-4">
                        <label class="block text-darkgrey text-sm mb-2" for="email">
                        Email
                        </label>
                        <input class="shadow appearance-none rounded w-full py-2 px-3 text-darkgrey leading-tight focus:outline-none focus:shadow-outline" id="email" autocomplete="username" type="text" placeholder="johndoe@gmail.com">
                    </div>
                    <div class="mb-6">
                        <label class="flex justify-between text-darkgrey text-sm mb-2" for="password">
                        <p>Password</p>
                        <a class="inline-block align-baseline text-sm text-blue hover:text-blue" href="#/login">
                        Forgot Password?
                        </a>
                        </label>
                        <input class="shadow appearance-none rounded w-full py-2 px-3 text-darkgrey mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" autocomplete="current-password" type="password" placeholder="*******">
                    </div>
                    <div class="flex items-center justify-between">
                        <button class="w-full bg-blue hover:bg-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Continue
                        </button>
                    </div>
                </form>
                <div class="mb-4">
                    <p class="block text-darkgrey text-sm py-1" for="email">
                    Don't have an account?<a class="inline-block align-baseline text-sm text-blue hover:text-blue px-2" href="#/register">
                    Sign up
                    </a>
                    </p>
                </div>
            </div>
        `
        return view
    }, 
    // All the code related to DOM interactions and controls go in here.
    // This is a separate call as these can be registered only after the DOM has been painted
    after_render: async () => {
        
    }
}

export default Login;

{/* <p class="text-red text-xs italic">Please choose a password. */}