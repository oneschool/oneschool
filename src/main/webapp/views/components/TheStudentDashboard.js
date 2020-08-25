const TheStudentDashboard = {
  render: async () => {
      let view =  /*html*/`
        <div class="pb-5 border-b border-gray-200">
        <div class="-ml-2 -mt-2 flex flex-wrap items-baseline">
            <p class="ml-2 mt-1 text-sm leading-5 text-gray-500 truncate">Welcome, </p>
            <h3 id="account-name" class="ml-2 mt-2 text-lg leading-6 font-medium text-gray-900">
            </h3>
        </div>
        </div>
      `
      return view
  },
  after_render: async () => { 
    const userData = JSON.parse(localStorage.getItem("user@os"));
    const welcomeName = document.querySelector("#account-name");
    welcomeName.innerText = userData.name.split(" ").slice(0)

  }

}

export default TheStudentDashboard;