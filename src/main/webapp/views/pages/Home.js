
let Home = {
    render : async () => {  
        let view =  /*html*/`
            <!-- Two columns -->
            <div class="home flex mb-4 items-center p-10 h-25">
                <div class="w-1/2 bg-gray-400 h-25 p-16">
                    <p class="text-4xl">Built for Students and Educators</p>
                    <p class="text-xl text-lightgrey">OneSchool is a platform inspired by the way we learn. From schools to colleges, you teach in your classrooms at the ease of our mulitple products.</p>
                </div>
                <div class="w-1/2 h-25 p-16">
                    <img src="img/home.svg" class="h-25">
                </div>
            </div>
        `
        return view
    },
    after_render: async () => {}
}

export default Home;