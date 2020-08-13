const TheNavBar = {
    render: async () => {
        let view =  /*html*/`
                <nav class="flex items-center justify-between flex-wrap bg-white-500">
                    <div class="flex flex-shrink-0">
                    <a href="/#">
                        <p class="text-blue font-semibold text-2xl">oneschool</p>
                    </a>
                    </div>
                    <a href="/#/login">
                        <button class="bg-lightblue border border-blue hover:border-lightblue text-blue py-2 px-4 rounded-full focus:outline-none">
                            Sign In
                        </button>
                    </a>
                </nav>

        `
        
        return view
    },
    after_render: async () => {
        
    }

}

export default TheNavBar;
