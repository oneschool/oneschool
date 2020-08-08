const TheNavBar = {
    render: async () => {
        let view =  /*html*/`
                <nav class="flex items-center justify-between flex-wrap bg-white">
                    <div class="flex flex-shrink-0">
                    <a href="/#">
                        <p class="text-blue font-semibold text-2xl">oneschool</p>
                    </a>
                    </div>
                    <div class="flex justify-center">
                        <a href="/#/login">
                        <button id="sign-in-btn" class="flex flex-row items-center justify-center bg-lightblue border border-lightblue hover:border-blue text-blue py-2 px-4 rounded-full focus:outline-none">
                        Sign In <svg class="" height="14px" id="right-arrow-svg" style="enable-background:new 0 0 512 512;fill: #6C63FF;" version="1.1" viewBox="0 0 512 512" width="14px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon points="160,128.4 192.3,96 352,256 352,256 352,256 192.3,416 160,383.6 287.3,256"/></svg>
                        </button>
                        </a>
                        <button id="sign-out-btn" class="hidden flex-row items-center justify-center bg-lightblue border border-lightblue hover:border-blue text-blue py-2 px-4 rounded-full focus:outline-none">
                        Sign Out 
                        </button>
                    </div>
                </nav>

        `
        
        return view
    },
    after_render: async () => {
        const signOutBtn = null || document.querySelector("#sign-out-btn");
        const signInBtn = null || document.querySelector("#sign-in-btn")

        // listener for auth status
        auth.onAuthStateChanged((user) => {
            user ? showSignOutBtn() : showSignInBtn();
        })

        // only one button will be visible at a time
        // hide sign out
        const showSignInBtn = () => {
            signOutBtn.classList.remove("flex");
            signOutBtn.classList.add("hidden");

            signInBtn.classList.remove("hidden");
            signInBtn.classList.add("flex");
        }

        // hide sign in
        const showSignOutBtn = () => {
            signInBtn.classList.remove("flex");
            signInBtn.classList.add("hidden");

            signOutBtn.classList.remove("hidden");
            signOutBtn.classList.add("flex");
        }
    }

}

export default TheNavBar;
