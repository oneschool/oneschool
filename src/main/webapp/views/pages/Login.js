const Login = {
    render : async () => {
        let view =  /*html*/`
            <div class="w-full flex justify-center">
                <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div class="mb-4">
                        <label class="block text-darkgrey text-sm font-bold mb-2" for="email">
                        Email
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-darkgrey leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="mail@google.com">
                    </div>
                    <div class="mb-6">
                        <label class="block text-darkgrey text-sm font-bold mb-2" for="password">
                        Password
                        </label>
                        <input class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-darkgrey mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
                        <p class="text-red text-xs italic">Please choose a password.</p>
                    </div>
                    <div class="flex items-center justify-between">
                        <button class="bg-blue hover:bg-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Sign In
                        </button>
                        <a class="inline-block align-baseline text-sm text-blue hover:text-blue" href="#">
                        Forgot Password?
                        </a>
                    </div>
                </form>
            </div>
        `
        return view
    }, 
    after_render: async () => {}
}

export default Login;