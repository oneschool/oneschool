import { postAssignment, getAssignment, putAssignment } from "../../osapi/OsApi.js"
import TheLoader from "./TheLoader.js"

const TheStudentAssignments = {
  render: async () => {

      let view =  /*html*/`
      <div style="display: none;" id="page_loader_ass" class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div class="w-12 h-12 border-4 border-purple-600 rounded-full loader"></div>
      </div>   
      <div id="ass-section">
      <div id="sass-list" >
        <h4 class="ml-2 mt-4 text-lg leading-6 font-medium text-gray-900">
        Pending Assignments
        </h4>
        <div class="bg-white shadow overflow-hidden sm:rounded-md mt-4">
            <ul id="pending-sass-list">
            </ul>
        </div>
        <h4 class="ml-2 mt-4 text-lg leading-6 font-medium text-gray-900">
        Submitted Assignments
        </h4>
        <div class="bg-white shadow overflow-hidden sm:rounded-md mt-4">
            <ul id="submitted-sass-list">
            </ul>
        </div>
      </div>

      <form id="editsass-form" style="display: none;">
        <div id="editsass-data" class="bg-white shadow overflow-hidden sm:rounded-lg mt-4">
          
        </div>
        <div class="mt-4 pt-5">
          <div class="flex justify-end">
            <span class="inline-flex rounded-md shadow-sm">
              <button id="cancel-edit-sass" type="button" class="py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
                Cancel
              </button>
            </span>
            <span class="ml-3 inline-flex rounded-md shadow-sm">
              <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                Submit
              </button>
            </span>
          </div>
        </div>
      </form>

      </div>
      `
      return view
  },
  after_render: async () => { 
    // yay
    const pageLoader = document.querySelector("#page_loader_ass");
    const sectionAss = document.querySelector("#ass-section");
    const errorContainer = document.querySelector("#error-container");
    const errorList = document.querySelector("#error-list");
    const closeErrorBtn = document.querySelector("#close-error-btn");

    const userData = JSON.parse(localStorage.getItem("user@os"));
    const AssList = document.querySelector("#sass-list");
    const pendingAssList = document.querySelector("#pending-sass-list");
    const submittedAssList = document.querySelector("#submitted-sass-list");

    const editAssForm = document.querySelector("#editsass-form");
    const cancelEditAssignmentForm = document.querySelector("#cancel-edit-sass");
    const editAssData = document.querySelector("#editsass-data");

    const hideEditAssForm = () => {
      editAssForm.style.display = "none";
    }

    const hideAssList = () => {
      AssList.style.display = "none";
    }


    const showAssList = () => {
      AssList.style.display = "";
    }

    const showEditAssForm = () => {
      editAssForm.style.display = "";
    }

    const showLoader = () => {
      pageLoader.style.display = "";
      sectionAss.style.display = "none";
    }

    const hideLoader = () => {
      pageLoader.style.display = "none";
      sectionAss.style.display = "";
    }

    const createAndAppendPendingAndSubmittedAssignments = (ass) => {
      const {name, description, deadline, scored_marks, total_marks, checked, submitted} = ass;
      const shortDesc = description.slice(0, 25) + "...";
      const date = new Date(deadline);
      const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
      const dateString = date.toLocaleDateString("en-US", options);
      const peli = `<a class="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
          <div class="px-4 py-4 sm:px-6">
          <div class="flex items-center justify-between">
              <div class="text-sm leading-5 font-medium text-indigo-600 truncate">
              ${name}
              </div>
              <div class="ml-2 flex-shrink-0 flex">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  Not Submitted
              </span>
              </div>
          </div>
          <div class="mt-2 sm:flex sm:justify-between">
              <div class="sm:flex">
              <div class="mr-6 flex items-center text-sm leading-5 text-gray-500">
                  ${shortDesc}
              </div>
              </div>
              <div class="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mt-0">
              <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
              </svg>
              <span>
                  Closing on
                  ${dateString}
              </span>
              </div>
          </div>
          </div>
        </a>`;

      const celi = `<a class="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
          <div class="px-4 py-4 sm:px-6">
          <div class="flex items-center justify-between">
              <div class="text-sm leading-5 font-medium text-indigo-600 truncate">
              ${name}
              </div>
              <div class="ml-2 flex-shrink-0 flex">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                Submitted
              </span>
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  ${checked ? "Checked" + "(" + scored_marks + "/" + total_marks + ")"  : "Not Checked"}
              </span>
              </div>
          </div>
          <div class="mt-2 sm:flex sm:justify-between">
              <div class="sm:flex">
              <div class="mr-6 flex items-center text-sm leading-5 text-gray-500">
                  ${shortDesc}
              </div>
              </div>
              <div class="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mt-0">
              <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
              </svg>
              <span>
                  Closing on
                  ${dateString}
              </span>
              </div>
          </div>
          </div>
      </a>`;

      const newEli = document.createElement("li");
      newEli.setAttribute("class", "cursor-pointer");
      newEli.setAttribute("data", JSON.stringify(ass));
      if (submitted === false) {
        newEli.innerHTML = peli;
        pendingAssList.append(newEli);
      } else {
        newEli.innerHTML = celi;
        submittedAssList.append(newEli);
      }
    }

    const getClosestParent = (elem, selector) => {
      let count = 0;
      for ( ; elem && elem !== document; elem = elem.parentNode ) {
        if ( elem.matches( selector ) ) return elem;
        count++;
        if (count > 5) return null;
      }
      return null;
    }

    const showAssignmentEditForm = ({id, description, solution, total_marks, name, submitted, checked, scored_marks}) => {
      hideAssList();
      editAssData.innerHTML = "";
      editAssData.setAttribute("id", id);
      const dataDiv = document.createElement("div");
      dataDiv.setAttribute("class", "px-4 py-5 border-b border-gray-200 sm:px-6");
      const data = `<h3 class="text-lg leading-6 font-medium text-gray-900">
          ${name}
        </h3>
        <p class="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
          Please submit your solution.
        </p>
      </div>
      <div class="mt-4">
        <dl>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm leading-5 font-medium text-gray-500">
              Description
            </dt>
            <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
              ${description}
            </dd>
          </div>
          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm leading-5 font-medium text-gray-500">
              Solution
            </dt>
            <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
              <textarea id="edit-ass-solution" rows="3" class="form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"></textarea>
            </dd>
          </div>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm leading-5 font-medium text-gray-500">
              Total Marks
            </dt>
            <dd class="mtCreate-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
              ${total_marks}
            </dd>
          </div>
          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm leading-5 font-medium text-gray-500">
              Scored Marks
            </dt>
            <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
              ${scored_marks ? 0 : scored_marks}
            </dd>
          </div>
        </dl>`
      dataDiv.innerHTML = data;
      editAssData.append(dataDiv);
      showEditAssForm();
    }

    const updateAssignment = ({id, solution}) => {
      
      showLoader();

      var checkExist = setInterval(() => {
        if (auth.currentUser) {
            clearInterval(checkExist);
            auth.currentUser.getIdToken().then((token) => {
              putAssignment({
                xToken: token,
                assignment: {
                  id: id,
                  solution: solution
                }
              }).then((resp) => {
                console.debug(resp);
                hideEditAssForm();
                hideLoader();
                fetchAssignments();
                showAssList();
              }).catch((err) => {
                console.debug("Assignment update failed");
                console.debug(err.message);
              })
            }).catch((err) => {
                console.debug(err.message);
            })
        }
        // console.debug(name, description);
        // clearInterval(checkExist);
      }, 100)

    }

    const validateEditAssForm = () => {
      const solution = editAssForm["edit-ass-solution"].value?.trim()
      const assignmentId = editAssData.getAttribute("id");
      let valid = solution !== null;
      valid = valid && (assignmentId != null) && (assignmentId !== "");

      console.debug(valid, solution, assignmentId);
      
      return {
        valid: valid,
        id: assignmentId,
        solution: solution
      }
    }
    
    const fetchAssignments = () => {
      // load assignment list
      
      var checkExist = setInterval(() => {
        if (auth.currentUser) {
          clearInterval(checkExist);
          auth.currentUser.getIdToken().then((token) => {
            getAssignment({
              xToken: token
            }).then((resp) => {
              console.debug(resp);
              localStorage.setItem("assignments@os", JSON.stringify(resp.data));
              pendingAssList.innerHTML = "";
              submittedAssList.innerHTML = "";
              resp.data.forEach(ass => {
                createAndAppendPendingAndSubmittedAssignments(ass);
              });
            }).catch((err) => {
              console.debug(err.message);
            })
          }).catch((err) => {
            console.debug(err.message);
            const getClosestParent = (elem, selector) => {
              let count = 0;
                for ( ; elem && elem !== document; elem = elem.parentNode ) {
                  if ( elem.matches( selector ) ) return elem;
                  count++;
                  if (count > 5) return null;
                }
                return null;
              }       })
            }
      }, 100);
    }
    fetchAssignments();

    cancelEditAssignmentForm.addEventListener("click", (e) => {
      e.preventDefault();
      hideEditAssForm();
      showAssList();
    })

    editAssForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = validateEditAssForm();
      if (data.valid) {
        updateAssignment(data);
      } else {
        errorContainer.style.display = "";
      }
      return false;
    })
    
    AssList.addEventListener("click", (e) => {
      const li = getClosestParent(e.target, "li");
      if (li) {
        const data = li.getAttribute("data");
        if (data) {
          const dataObject = JSON.parse(data);
          console.debug(dataObject);
          showAssignmentEditForm(dataObject);
        }
      } 
    })
  }

}

export default TheStudentAssignments;