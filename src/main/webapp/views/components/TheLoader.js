const TheLoader = {
  render: async () => {
      let view =  /*html*/`
        <div style="display: none;" id="page_loader" class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div class="w-12 h-12 border-4 border-purple-600 rounded-full loader"></div>
        </div>      
        `
      
      return view
  },
  after_render: async () => {
  }

}

export default TheLoader;
