import Utils from "../../utils/Utils.js";
import TheLoader from "../components/TheLoader.js";
import { getAccount, postAccount as createAccount } from "../../osapi/OsApi.js";

const Register = {
    render : async () => {
        const Loader = await TheLoader.render();

        const view =  /*html*/`
            ${Loader}
            <div id="page_register" class="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
                <div class="max-w-md w-full">
                    <div>
                        <a href="/#">
                        <img class="mx-auto h-8 w-auto" src="img/oneschool.svg" alt="OneSchool">
                        <a>
                        <h2 class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                            Create your account
                        </h2>
                        <p class="mt-2 text-center text-sm leading-5 text-gray-600">
                            Or
                            <a href="#/login" class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                            Sign in to your existing account
                            </a>
                        </p>
                    </div>

                    <div id="error-container" style="display: none;" class="rounded-md bg-red-50 my-4 p-4">
                    <div class="flex">
                        <div id="close-error-btn" class="cursor-pointer flex-shrink-0">
                            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div class="ml-3">
                            <h3 class="text-sm leading-5 font-medium text-red-800">
                                There were a few errors
                            </h3>
                            <div class="mt-2 text-sm leading-5 text-red-700">
                                <ul id="error-list" class="list-disc pl-5">
                                </ul>
                            </div>
                        </div>
                    </div>
                    </div>

                    <form class="mt-8" id="signup-form">
                        <div class="mb-4">
                            <label class="block text-gray-900 text-sm mb-2" for="email">
                            Email
                            </label>
                            <input required class="shadow appearance-none rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline" autocomplete="username" id="email" type="text" placeholder="johndoe@gmail.com">
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-900 text-sm mb-2" for="name">
                            Full Name
                            </label>
                            <input required class="shadow appearance-none rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="John Doe">
                        </div>
                        <div class="mb-4">
                            <label class="flex justify-between text-gray-900 text-sm mb-2" for="password">
                            Password
                            </label>
                            <input required class="shadow appearance-none rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline" id="password" autocomplete="new-password" type="password" placeholder="*******">
                            <p class="mt-2 text-sm text-gray-500">Minimum password length: 6</p>
                        </div>
                        <div class="mb-4">
                            <label class="flex justify-between text-gray-900 text-sm mb-2" for="confirm-password">
                            Confirm Password
                            </label>
                            <input required class="shadow appearance-none rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline" id="confirm-password" autocomplete="new-password" type="password" placeholder="*******">
                        </div>
                        <div class="mb-6">
                            <label class="flex justify-between text-gray-900 text-sm mb-2" for="role">
                            Role
                            </label>
                            <div class="relative">
                                <select class="shadow appearance-none bg-white rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline" id="role">
                                    <option>Educator</option>
                                    <option>Student</option>
                                </select>
                                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center justify-between">
                            <button id="create-account" disabled="true" class="w-full disabled bg-indigo-500 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Create account
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
        
        // yay
        await TheLoader.after_render();
        const pageLoader = document.querySelector("#page_loader");
        const pageRegister = document.querySelector("#page_register");
        const errorContainer = document.querySelector("#error-container");
        const errorList = document.querySelector("#error-list");
        const closeErrorBtn = document.querySelector("#close-error-btn");

        const navigateToDashboard = () => {
            const userData = JSON.parse(localStorage.getItem("user@os"));
            if (userData?.role == "educator") {
                Utils.navigateToHash("app");
            } else if (userData?.role == "student") {
                Utils.navigateToHash("app");
            }
        }

        const form = document.querySelector("#signup-form");
        const createAccountBtn = document.querySelector("#create-account")
        const showErrorContainer = () => {
            errorContainer.style.display = "";
        }

        const showLoader = () => {
            
        }
        const hideErrorContainer = () => {
            errorContainer.style.display = "none";
        }

        const addError = (err) => {
            const errorLi = document.createElement("li");
            errorLi.innerText = err;
            errorList.append(errorLi);
        }



        const enableCreateAccountBtn = () => {
            createAccountBtn.removeAttribute("disabled");
            createAccountBtn.classList.remove("disabled");
        }

        const disableCreateAccountBtn = () => {
            createAccountBtn.setAttribute("disabled", "true");
            createAccountBtn.classList.add("disabled");
        }


        const validateForm = () => {
            const email = form["email"].value.trim();
            const name = form["name"].value.trim();
            const password = form["password"].value;
            const confirmPassword = form["confirm-password"].value;
            const role = form["role"].value;
            
            let valid = true;

            // simple email validation
            const mailFmt = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
            valid = valid && (mailFmt.test(email))

            // name validation
            valid = valid && (name.length > 0)

            // password validation
            // password length 6 (firebase thingy)
            valid = valid && (password.length > 5 && password === confirmPassword)
            
            // role validation
            valid = valid && (role === "Student" || role === "Educator")

            // enable or disable account button
            valid ? enableCreateAccountBtn() : disableCreateAccountBtn();

            return {
                valid: valid,
                email: email,
                name: name,
                password: password,
                role: role
            };
        }
        
        const registerUser = ({email, name, password, role}) => {
            showLoader();

            // firebase is only used for auth and nothing else
            auth.createUserWithEmailAndPassword(email, password).then(({user}) => {
                // TODO: check back cred and update details on backend accordingly
                // user.uid
                // emailVerified?
                // role?
                // name?
                // photoUrl?
                // isNewUser?
                user.getIdToken().then((idToken) => {
                    createAccount({
                        xToken: idToken,
                        account: {
                            email: email,
                            name: name,
                            role: role
                        }
                    }).then((response) => {
                        console.debug("reg successful, hit osapi success");
                        console.debug(response);
                        console.debug(idToken)
                        getAccount({
                            xToken: idToken
                        }).then((response) => {
                            localStorage.setItem("user@os", JSON.stringify(response.data));
                            console.debug(response);
                            console.debug("skadjhkasdh");
                            navigateToDashboard();
                            console.debug("dfaSF");
                        })
                    })
                }).catch((err) => {

                })

                // lazy async task to send verification mail
                if (!user.emailVerfied) {
                    console.debug("sending verification mail");
                    user.sendEmailVerification().then(() => {
                        console.debug("email verification link sent");
                    }).catch((err) => {
                        console.debug("error: email verification mail was not sent", err)
                    })
                }
            }).catch((err) => {
                showErrorContainer();
                addError("Firebase could not be reached.");
                console.debug("Sign Up Error", err);
            })
        }

        // validates the form on every user input
        form.addEventListener("input", (e) => {
            validateForm();
        })
        
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const data = validateForm();
            if (data.valid) {
                // registerUser
                registerUser(data);
            } else {
                console.debug("you should not have reached here: invalid data..")
            }
        })

        closeErrorBtn.addEventListener("click", (e) => {
            e.preventDefault();
            hideErrorContainer();
        })
        
        // showErrorContainer();
        // addError("dsifjdfj");

    }
}

export default Register;

{/* <p class="text-red text-xs italic">Please choose a password. */}