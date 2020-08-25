import Utils from "../../utils/Utils.js";
import TheLoader from "../components/TheLoader.js";
import { getAccount } from "../../osapi/OsApi.js"

const Login = {
    render : async () => {
        const Loader = await TheLoader.render();

        const view =  /*html*/`
            ${Loader}
            <div id="page_login" class="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
                <div class="max-w-md w-full">
                    <div>
                    <a href="/#">
                    <img class="mx-auto h-8 w-auto" src="img/oneschool.svg" alt="OneSchool">
                    <a>
                    <h2 class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                    <p class="mt-2 text-center text-sm leading-5 text-gray-600">
                        Or
                        <a href="#/register" class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                        Register for a new account
                        </a>
                    </p>
                    </div>
                    <form class="mt-8" id="signin-form">
                    <input type="hidden" name="remember" value="true">
                    <div class="rounded-md shadow-sm">
                        <div>
                        <input autocomplete="username" aria-label="Email address" name="email" id="email" type="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Email address">
                        </div>
                        <div class="-mt-px">
                        <input autocomplete="current-password" aria-label="Password" name="password" id="password" type="password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Password">
                        </div>
                    </div>

                    <div class="mt-6 flex items-center justify-between">
                        <div class="flex items-center">
                        <input id="remember_me" type="checkbox" class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out">
                        <label for="remember_me" class="ml-2 block text-sm leading-5 text-gray-900">
                            Remember me
                        </label>
                        </div>

                        <div class="text-sm leading-5">
                        <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                            Forgot your password?
                        </a>
                        </div>
                    </div>

                    <div class="mt-6">
                        <button id="submit-btn" type="submit" disabled class="disabled group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                            <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                            </svg>
                        </span>
                        Sign in
                        </button>
                    </div>
                    </form>
                </div>
            </div>

        `
        return view
    }, 
    // All the code related to DOM interactions and controls go in here.
    // This is a separate call as these can be registered only after the DOM has been painted
    after_render: async () => {

        const navigateToDashboard = () => {
            const userData = JSON.parse(localStorage.getItem("user@os"));
            if (userData?.role == "educator") {
                Utils.navigateToHash("app");
            } else if (userData?.role == "student") {
                Utils.navigateToHash("app");
            }
        }

        navigateToDashboard();
        
        // yay
        await TheLoader.after_render();
        const pageLoader = document.querySelector("#page_loader");
        const pageLogin = document.querySelector("#page_login");

        const form = document.querySelector("#signin-form");
        const submit = document.querySelector("#submit-btn")
        
        // validates the form on every user input
        form.addEventListener("input", (e) => {
            validateForm();
        })
        
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const data = validateForm();
            if (data.valid) {
                // signin user
                signInUser(data);
            } else {
                console.debug("you should not have reached here: invalid data..")
            }
        })

        const validateForm = () => {
            const email = form["email"].value.trim();
            const password = form["password"].value;
            
            let valid = true;

            // simple email validation
            const mailFmt = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
            valid = valid && (mailFmt.test(email))

            // password validation
            // password length 6 (firebase thingy)
            valid = valid && (password.length > 5)
            

            // enable or disable account button
            valid ? enableSubmitBtn() : disableSubmitBtn();

            return {
                valid: valid,
                email: email,
                password: password,
            };
        }
        
        const signInUser = ({email, password}) => {
            // show loader
            pageLogin.style.display = "none";
            pageLoader.style.display = "";

            // firebase is only used for auth and nothing else
            auth.signInWithEmailAndPassword(email, password).then(({user}) => {
                user.getIdToken().then((idToken) => {
                    console.debug(idToken);
                    getAccount({
                        xToken: idToken
                    }).then((response) => {
                        console.debug("hit ospai get acc success");
                        console.debug(response);
                        localStorage.setItem("user@os", JSON.stringify(response.data));
                        navigateToDashboard();
                        console.debug("hahah");
                    })
                })
                console.debug("user signed in")
                // TODO:    
                // check back cred and update details on backend accordingly and fetch current details
                // emailVerified?
                // role?
                // name?
                // photoUrl?
            }).catch((err) => {
                // TODO: handle wrong password show a notification sort of bar or just unhide some component in dom
                console.debug("Sign In Error", err);
            })
        }

        const enableSubmitBtn = () => {
            submit.removeAttribute("disabled");
            submit.classList.remove("disabled");
        }

        const disableSubmitBtn = () => {
            submit.setAttribute("disabled", "true");
            submit.classList.add("disabled");
        }
    }
}

export default Login;

{/* <p class="text-red text-xs italic">Please choose a password. */}