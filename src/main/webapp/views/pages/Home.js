import TheNavBar from '../components/TheNavBar.js';

const Home = {
    render : async () => {
        // Render the NavBar only on home page
        // Always remember to run all the after_render functions 
        // of loaded components in after_render method of the page
        const theNavBar = await TheNavBar.render();
        
        const view =  /*html*/`
        ${theNavBar}
        <!-- Two columns -->
        <div class="home flex flex-wrap my-20 px-20 items-center justify-between">
        <div class="w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-4">
        <p class="text-4xl">Built for Students and Educators</p>
        <p class="text-xl text-lightgrey">OneSchool is a platform inspired by the way we learn. From schools to colleges, you teach in your classrooms at the ease of our mulitple products.</p>
        </div>
        <div class="w-full flex justify-center sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-4">
        <img src="img/home.svg" class="w-2/3">
        </div>
        </div>
        `
        return view
    },
    after_render: async () => {
        // after_render of components loaded in the page
        await TheNavBar.after_render();

        const signOutBtn = null || document.querySelector("#sign-out-btn");

        // signout user
        signOutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            auth.signOut().then(() => {
                console.debug("user signed out")
            })
        })

    }
}

export default Home;