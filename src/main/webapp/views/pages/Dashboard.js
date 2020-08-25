import Utils from "../../utils/Utils.js";

const Educator = {
  render : async () => {
      // Always remember to run all the after_render functions 
      // of loaded components in after_render method of the page
      
      const view =  /*html*/`
        <div class="h-screen flex overflow-hidden bg-gray-100" x-data="{ sideBarOpen: false }" @keydown.window.escape="sideBarOpen = false">
          <!-- Off-canvas menu for mobile -->
          <div x-show="sideBarOpen" class="md:hidden">
            <div class="fixed inset-0 flex z-40">
              <!--
                Off-canvas menu overlay, show/hide based on off-canvas menu state.
        
                Entering: "transition-opacity ease-linear duration-300"
                  From: "opacity-0"
                  To: "opacity-100"
                Leaving: "transition-opacity ease-linear duration-300"
                  From: "opacity-100"
                  To: "opacity-0"
              -->
              <div 
                @click="sideBarOpen = false"
                x-show="sideBarOpen" 
                x-transition:enter="transition-opacity ease-linear duration-300"
                x-transition:enter-start="opacity-0"
                x-transition:enter-end="opacity-100"
                x-transition:leave="transition-opacity ease-linear duration-300"
                x-transition:leave-start="opacity-100"
                x-transition:leave-end="opacity-0"
                class="fixed inset-0">
                <div class="absolute inset-0 bg-gray-600 opacity-75"></div>
              </div>
              <!--
                Off-canvas menu, show/hide based on off-canvas menu state.
        
                Entering: "transition ease-in-out duration-300 transform"
                  From: "-translate-x-full"
                  To: "translate-x-0"
                Leaving: "transition ease-in-out duration-300 transform"
                  From: "translate-x-0"
                  To: "-translate-x-full"
              -->
              <div 
                x-show="sideBarOpen" 
                x-transition:enter="transition ease-in-out duration-300 transform"
                x-transition:enter-start="-translate-x-full"
                x-transition:enter-end="translate-x-0"
                x-transition:leave="transition ease-in-out duration-300 transform"
                x-transition:leave-start="translate-x-0"
                x-transition:leave-end="-translate-x-full"
                class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
                <div class="absolute top-0 right-0 -mr-14 p-1">
                  <button x-show="sideBarOpen" @click="sideBarOpen = false" class="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600" aria-label="Close sidebar">
                    <svg class="h-6 w-6 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <!-- Left mobile side bar -->
                <div class="flex-shrink-0 flex items-center px-4">
                <a href="#">
                  <img class="h-8 w-auto" src="img/oneschool.svg" alt="Oneschool">
                </a>
                </div>
                <div class="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav class="px-2 space-y-1">
                    <span style="display: none;" class="educator-badge inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-purple-100 text-purple-800">
                      Educator
                    </span>
                    <span style="display: none;" class="student-badge inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-pink-100 text-pink-800">
                      Student
                    </span>
                    <div class="cursor-pointer dashboard group flex items-center px-2 py-2 text-base leading-6 font-medium text-gray-900 rounded-md bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150">
                      <svg class="mr-4 h-6 w-6 text-gray-500 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Dashboard
                    </div>
        
                    <div class="cursor-pointer classrooms group flex items-center px-2 py-2 text-base leading-6 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition ease-in-out duration-150">
                      <svg class="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      Classrooms
                    </div>
        
                    <div class="cursor-pointer assignments group flex items-center px-2 py-2 text-base leading-6 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition ease-in-out duration-150">
                      <svg class="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                      Assignments
                    </div>
                  </nav>
                </div>
              </div>
              <div class="flex-shrink-0 w-14">
                <!-- Dummy element to force sidebar to shrink to fit close icon -->
              </div>
            </div>
          </div>
        
          <!-- Static sidebar for desktop -->
          <div class="hidden md:flex md:flex-shrink-0">
            <div class="flex flex-col w-64">
              <!-- Sidebar component, swap this element with another sidebar if you like -->
              <div class="flex flex-col flex-grow border-r border-gray-200 pt-5 pb-4 bg-white overflow-y-auto">
                <div class="flex items-center flex-shrink-0 px-4">
                <a href="#">
                  <img class="h-8 w-auto" src="img/oneschool.svg" alt="Oneschool">
                </a>
                </div>
                <div class="mt-5 flex-grow flex flex-col">
                  <nav class="flex-1 px-2 bg-white space-y-1">
                    <span style="display: none;" class="educator-badge inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-purple-100 text-purple-800">
                      Educator
                    </span>
                    <span style="display: none;" class="student-badge inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-pink-100 text-pink-800">
                      Student
                    </span>
                    <div class="cursor-pointer dashboard bg-gray-100 group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md  hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150">
                      <svg class="mr-3 h-6 w-6 text-gray-500 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Dashboard
                    </div>
        
                    <div class="cursor-pointer classrooms group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150">
                      <svg class="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      Classrooms
                    </div>
        
                    <div class="cursor-pointer assignments group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150">
                      <svg class="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                      Assignments
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col w-0 flex-1 overflow-hidden">
            <div class="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
              <button @click="sideBarOpen = true" class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:bg-gray-100 focus:text-gray-600 md:hidden" aria-label="Open sidebar">
                <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </button>
              <div class="flex-1 px-4 flex justify-between">
                <div class="flex-1 flex">
                  <form class="w-full flex md:ml-0" action="#" method="GET">
                    <label for="search_field" class="sr-only">Search</label>
                    <div class="relative w-full text-gray-400 focus-within:text-gray-600">
                      <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                        <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
                        </svg>
                      </div>
                      <input id="search_field" class="block w-full h-full pl-8 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 sm:text-sm" placeholder="Search" type="search">
                    </div>
                  </form>
                </div>
                <div class="ml-4 flex items-center md:ml-6">
        
                  <!-- Profile dropdown -->
                  <div @click.away="open = false" class="ml-3 relative" x-data="{ open: false }">
                    <div>
                      <button @click="open = !open" class="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:shadow-outline" id="user-menu" aria-label="User menu" aria-haspopup="true">
                        <img class="h-8 w-8 rounded-full" src="https://karngyan.com/assets/images/profile.jpg" alt="">
                      </button>
                    </div>
                    <div 
                      x-show="open" 
                      x-description="Profile dropdown panel, show/hide based on dropdown state." 
                      x-transition:enter="transition ease-out duration-100" 
                      x-transition:enter-start="transform opacity-0 scale-95" 
                      x-transition:enter-end="transform opacity-100 scale-100" 
                      x-transition:leave="transition ease-in duration-75" 
                      x-transition:leave-start="transform opacity-100 scale-100" 
                      x-transition:leave-end="transform opacity-0 scale-95" 
                      class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                      <div class="py-1 rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                        <!-- Add more options like profile, settings -->
                        <a href="" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition ease-in-out duration-150" role="menuitem">Your Profile</a>
                        <a href="" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition ease-in-out duration-150" role="menuitem">Settings</a>
                        <a href="#" id="sign-out-btn" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition ease-in-out duration-150" role="menuitem">Sign out</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        
            <main class="flex-1 relative overflow-y-auto focus:outline-none" tabindex="0">
              <div class="pt-2 pb-6 md:py-6">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                  <h1 id="section-header" class="text-2xl font-semibold text-gray-900">Dashboard</h1>
                </div>
                <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                  <!-- Replace with your content -->
                  <div class="py-4">
                    <div class="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
                  </div>
                  <!-- /End replace -->
                </div>
              </div>
            </main>
          </div>
        </div>
      `
      return view
  },
  after_render: async () => {
    const footerContainer = document.querySelector("#footer_container")
    // hide footer
    footerContainer.style.display = "none";
    
    // ----------- consts
    const userData = JSON.parse(localStorage.getItem("user@os"));
    const educatorBadges = document.getElementsByClassName("educator-badge");
    const studentBadges = document.getElementsByClassName("student-badge");
    const dashboardSidebar = document.getElementsByClassName("dashboard");
    const classroomSidebar = document.getElementsByClassName("classrooms");
    const assignmentSidebar = document.getElementsByClassName("assignments");
    const sectionHeader = document.querySelector("#section-header")
    
    const signOutBtn = document.querySelector("#sign-out-btn");
    console.debug(signOutBtn);

    // ----------- methods
    const navigateToLogin = () => {
      const userData = JSON.parse(localStorage.getItem("user@os"));
      if (userData == null) {
        Utils.navigateToHash("login")
      }
    };
    // initial run
    navigateToLogin();

    const showEducatorBadges = () => {
      [...educatorBadges].forEach((el) => {
        el.style.display = "";
      })
    };

    const showStudentBadges = () => {
      [...studentBadges].forEach((el) => {
        el.style.display = "";
      })
    };

    const focusDashboard = () => {
      sectionHeader.innerText = "Dashboard";
      [...dashboardSidebar].forEach((el) => {
        el.classList.add("bg-gray-100");
      });
      [...classroomSidebar].forEach((el) => {
        el.classList.remove("bg-gray-100");
      });
      [...assignmentSidebar].forEach((el) => {
        el.classList.remove("bg-gray-100");
      });
    };

    const focusClassroom = () => {
      sectionHeader.innerText = "Classrooms";
      [...classroomSidebar].forEach((el) => {
        el.classList.add("bg-gray-100");
      });
      [...dashboardSidebar].forEach((el) => {
        el.classList.remove("bg-gray-100");
      });
      [...assignmentSidebar].forEach((el) => {
        el.classList.remove("bg-gray-100");
      });
    };

    const focusAssignment = () => {
      sectionHeader.innerText = "Assignments";
      [...assignmentSidebar].forEach((el) => {
        el.classList.add("bg-gray-100");
      });
      [...dashboardSidebar].forEach((el) => {
        el.classList.remove("bg-gray-100");
      });
      [...classroomSidebar].forEach((el) => {
        el.classList.remove("bg-gray-100");
      });
    };

    // ------------ calls and logic and event listeners
    [...dashboardSidebar].forEach((el) => {
      el.addEventListener("click", (e) => {
          e.preventDefault();
          focusDashboard();
      })
    });

    [...classroomSidebar].forEach((el) => {
      el.addEventListener("click", (e) => {
          e.preventDefault();
          focusClassroom();
      })
    });


    [...assignmentSidebar].forEach((el) => {
      el.addEventListener("click", (e) => {
          e.preventDefault();
          focusAssignment();
      })
    });

    // signout user
    signOutBtn.addEventListener("click", (e) => {
      auth.signOut().then(() => {
          console.debug("user signed out");
          localStorage.removeItem("user@os");
      })
    })

    if (userData?.role === "educator") {
      showEducatorBadges();
    } else if (userData?.role === "student") {
      showStudentBadges();
    }

    // after_render of components loaded in the page
    console.debug(userData);
  }
}

export default Educator;