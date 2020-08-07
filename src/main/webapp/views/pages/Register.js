const Register = {
    render : async () => {
        const view =  /*html*/`
            <div class="home flex flex-wrap mt-10 px-40 items-center content-center justify-center">
                <div class="w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2">
                    <div class="w-full py-2 px-4 bg-lightblue rounded-lg h-full">
                        <a href="/#" class="flex justify-center py-6">
                            <p class="text-blue font-semibold text-2xl">oneschool</p>
                        </a>
                        <div class="flex flex-row pb-10">
                            <div class="px-4">
                                <svg height="20px" fill="#FFFFFF" viewBox="0 0 512 512" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm0 0" fill="#6C63FF"/><path d="m385.75 201.75-138.667969 138.664062c-4.160156 4.160157-9.621093 6.253907-15.082031 6.253907s-10.921875-2.09375-15.082031-6.253907l-69.332031-69.332031c-8.34375-8.339843-8.34375-21.824219 0-30.164062 8.339843-8.34375 21.820312-8.34375 30.164062 0l54.25 54.25 123.585938-123.582031c8.339843-8.34375 21.820312-8.34375 30.164062 0 8.339844 8.339843 8.339844 21.820312 0 30.164062zm0 0"/></svg>
                            </div>
                            <div>
                                <div class="font-semibold pb-3">Quick and free sign-up</div>
                                <div class="text-lightgrey">Enter you e-mail address to create an account.</div>
                            </div>
                        </div>
                        <div class="flex flex-row pb-10">
                            <div class="px-4">
                                <svg height="20px" fill="#FFFFFF" viewBox="0 0 512 512" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm0 0" fill="#6C63FF"/><path d="m385.75 201.75-138.667969 138.664062c-4.160156 4.160157-9.621093 6.253907-15.082031 6.253907s-10.921875-2.09375-15.082031-6.253907l-69.332031-69.332031c-8.34375-8.339843-8.34375-21.824219 0-30.164062 8.339843-8.34375 21.820312-8.34375 30.164062 0l54.25 54.25 123.585938-123.582031c8.339843-8.34375 21.820312-8.34375 30.164062 0 8.339844 8.339843 8.339844 21.820312 0 30.164062zm0 0"/></svg>
                            </div>
                            <div>
                                <div class="font-semibold pb-3">Schedule classes</div>
                                <div class="text-lightgrey">Easily schedule recurring classes with your students.</div>
                            </div>
                        </div>
                        <div class="flex flex-row pb-10">
                            <div class="px-4">
                                <svg height="20px" fill="#FFFFFF" viewBox="0 0 512 512" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm0 0" fill="#6C63FF"/><path d="m385.75 201.75-138.667969 138.664062c-4.160156 4.160157-9.621093 6.253907-15.082031 6.253907s-10.921875-2.09375-15.082031-6.253907l-69.332031-69.332031c-8.34375-8.339843-8.34375-21.824219 0-30.164062 8.339843-8.34375 21.820312-8.34375 30.164062 0l54.25 54.25 123.585938-123.582031c8.339843-8.34375 21.820312-8.34375 30.164062 0 8.339844 8.339843 8.339844 21.820312 0 30.164062zm0 0"/></svg>
                            </div>
                            <div>
                                <div class="font-semibold pb-3">Create assignments</div>
                                <div class="text-lightgrey">Send assignments to all your students and track their submissions.</div>
                            </div>
                        </div>
                        <div class="flex flex-row pb-10">
                            <div class="px-4">
                                <svg height="20px" fill="#FFFFFF" viewBox="0 0 512 512" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm0 0" fill="#6C63FF"/><path d="m385.75 201.75-138.667969 138.664062c-4.160156 4.160157-9.621093 6.253907-15.082031 6.253907s-10.921875-2.09375-15.082031-6.253907l-69.332031-69.332031c-8.34375-8.339843-8.34375-21.824219 0-30.164062 8.339843-8.34375 21.820312-8.34375 30.164062 0l54.25 54.25 123.585938-123.582031c8.339843-8.34375 21.820312-8.34375 30.164062 0 8.339844 8.339843 8.339844 21.820312 0 30.164062zm0 0"/></svg>
                            </div>
                            <div>
                                <div class="font-semibold pb-3">Follow your educator</div>
                                <div class="text-lightgrey">Students can attend classes, submit your assignments and get scores.</div>
                            </div>
                        </div>
                    </div>  
                </div>
                <div class="w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 flex flex-col content-center items-center justify-center">
                    <form class="bg-white w-full max-w-lg px-8 py-12 pt-6 pb-8" id="signup-form">
                        <div class="mb-4">
                            <p class="block text-darkgrey text-lg py-1" for="email">
                            Create your oneschool account
                            </p>
                        </div>
                        <div class="mb-4">
                            <label class="block text-darkgrey text-sm mb-2" for="email">
                            Email
                            </label>
                            <input required class="shadow appearance-none rounded w-full py-2 px-3 text-darkgrey leading-tight focus:outline-none focus:shadow-outline" autocomplete="username" id="email" type="text" placeholder="johndoe@gmail.com">
                        </div>
                        <div class="mb-4">
                            <label class="block text-darkgrey text-sm mb-2" for="name">
                            Full Name
                            </label>
                            <input required class="shadow appearance-none rounded w-full py-2 px-3 text-darkgrey leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="John Doe">
                        </div>
                        <div class="mb-4">
                            <label class="flex justify-between text-darkgrey text-sm mb-2" for="password">
                            Password
                            </label>
                            <input required class="shadow appearance-none rounded w-full py-2 px-3 text-darkgrey leading-tight focus:outline-none focus:shadow-outline" id="password" autocomplete="new-password" type="password" placeholder="*******">
                        </div>
                        <div class="mb-4">
                            <label class="flex justify-between text-darkgrey text-sm mb-2" for="confirm-password">
                            Confirm Password
                            </label>
                            <input required class="shadow appearance-none rounded w-full py-2 px-3 text-darkgrey leading-tight focus:outline-none focus:shadow-outline" id="confirm-password" autocomplete="new-password" type="password" placeholder="*******">
                        </div>
                        <div class="mb-6">
                            <label class="flex justify-between text-darkgrey text-sm mb-2" for="role">
                            Role
                            </label>
                            <div class="relative">
                                <select class="shadow appearance-none bg-white rounded w-full py-2 px-3 text-darkgrey leading-tight focus:outline-none focus:shadow-outline" id="role">
                                    <option>Educator</option>
                                    <option>Student</option>
                                </select>
                                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center justify-between">
                            <button id="create-account" disabled="true" class="w-full disabled bg-blue hover:bg-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Create account
                            </button>
                        </div>
                    </form>
                    <div class="mb-4">
                        <p class="block text-darkgrey text-sm py-1" for="email">
                        Have an account?<a class="inline-block align-baseline text-sm text-blue hover:text-blue px-2" href="#/login">
                        Sign in
                        </a>
                        </p>
                    </div>
                </div>
            </div>
        `
        return view
    }, 
    // All the code related to DOM interactions and controls go in here.
    // This is a separate call as these can be registered only after the DOM has been painted
    after_render: async () => {
        const form = document.querySelector("#signup-form");
        const createAccountBtn = document.querySelector("#create-account")
        
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
            // firebase is only used for auth and nothing else
            auth.createUserWithEmailAndPassword(email, password).then(cred => {
                console.debug(cred);
                // check back cred and update details on backend accordingly
                // emailVerified?
                // role?
                // name?
                // photoUrl?
                // isNewUser?
            }).catch((err) => {
                console.debug("Sign Up Error", err);
            })
        }

        const enableCreateAccountBtn = () => {
            createAccountBtn.removeAttribute("disabled");
            createAccountBtn.classList.remove("disabled");
        }

        const disableCreateAccountBtn = () => {
            createAccountBtn.setAttribute("disabled", "true");
            createAccountBtn.classList.add("disabled");
        }
    }
}

export default Register;

{/* <p class="text-red text-xs italic">Please choose a password. */}