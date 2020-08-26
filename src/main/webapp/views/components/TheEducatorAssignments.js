import { postAssignment, getAssignment } from "../../osapi/OsApi.js"
import TheLoader from "./TheLoader.js"

const TheEducatorAssignments = {
  render: async () => {

      const Loader = await TheLoader.render();

      let view =  /*html*/`
      ${Loader}
      <div id="ass-section">
      <div class="bg-white overflow-hidden sm:rounded-lg sm:shadow">
        <div class="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
          <div class="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-no-wrap">
            <div class="ml-4 mt-2">
            </div>
            <div class="ml-4 mt-2 flex-shrink-0">
              <span class="inline-flex rounded-md shadow-sm">
                <button id="create-new-ass-btn" type="button"
                  class="cursor-pointer relative inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700">
                  New Assignment
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div id="eass-list" >
        <h4 class="ml-2 mt-4 text-lg leading-6 font-medium text-gray-900">
        Pending Assignments
        </h4>
        <div class="bg-white shadow overflow-hidden sm:rounded-md mt-4">
            <ul id="pending-ass-list">
            </ul>
        </div>
        <h4 class="ml-2 mt-4 text-lg leading-6 font-medium text-gray-900">
        Checked Assignments
        </h4>
        <div class="bg-white shadow overflow-hidden sm:rounded-md mt-4">
            <ul id="checked-ass-list">
            </ul>
        </div>
      </div>
      <!-- form begin -->
      <form id="newass-form" style="display: none;">
        <div>
          <div>
            <div class="mt-6 grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">
              <div class="sm:col-span-6">
                <label for="new-ass-name" class="block text-sm font-medium leading-5 text-gray-700">
                  Assignment Name
                </label>
                <div class="sm:col-span-6">
                  <input id="new-ass-name" class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                </div>
              </div>

              <div class="sm:col-span-6">
                <label for="new-ass-desc" class="block text-sm font-medium leading-5 text-gray-700">
                  Description
                </label>
                <div class="mt-1 rounded-md shadow-sm">
                  <textarea id="new-ass-desc" rows="3" class="form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"></textarea>
                </div>
                <p class="mt-2 text-sm text-gray-500">Add drive or google docs links and give proper instructions to students to submit the assignment.</p>
              </div>

              <div class="sm:col-span-6">
                <label for="new-ass-classroom" class="block text-sm leading-5 font-medium text-gray-700">Classroom</label>
                <select id="new-ass-classroom" class="mt-1 form-select block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5">
                </select>
              </div>

              <div class="sm:col-span-6">
                <label for="new-ass-total-marks" class="block text-sm font-medium leading-5 text-gray-700">
                Total Marks
                </label>
                <div class="sm:col-span-6">
                  <input id="new-ass-total-marks" type="number" class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                </div>
              </div>

              <div class="sm:col-span-4">
              <label for="new-ass-deadline" class="block text-sm font-medium leading-5 text-gray-700">
              Deadline
              </label>
              <div class="sm:col-span-4">
              <input type="datetime-local" id="new-ass-deadline" class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">
              </div>
              </div>
            </div>
          </div>
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
                    There were a few errors. Make sure all the fields are filled.
                </h3>
                <div class="mt-2 text-sm leading-5 text-red-700">
                    <ul id="error-list" class="list-disc pl-5">
                    </ul>
                </div>
            </div>
        </div>
        </div>
        <div class="mt-8 border-t border-gray-200 pt-5">
          <div class="flex justify-end">
            <span class="inline-flex rounded-md shadow-sm">
              <button id="cancel-new-ass" type="button" class="py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
                Cancel
              </button>
            </span>
            <span class="ml-3 inline-flex rounded-md shadow-sm">
              <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                Create
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
    await TheLoader.after_render();
    const pageLoader = document.querySelector("#page_loader");
    const sectionAss = document.querySelector("#ass-section");
    
    const errorContainer = document.querySelector("#error-container");
    const errorList = document.querySelector("#error-list");
    const closeErrorBtn = document.querySelector("#close-error-btn");

    const userData = JSON.parse(localStorage.getItem("user@os"));
    const AssList = document.querySelector("#eass-list");
    const newAssForm = document.querySelector("#newass-form");
    const cancelNewAssignmentForm = document.querySelector("#cancel-new-ass")
    const createNewAssBtn = document.querySelector("#create-new-ass-btn");
    const pendingAssList = document.querySelector("#pending-ass-list");
    const checkedAssList = document.querySelector("#checked-ass-list");

    const newAssClassRoom = document.querySelector("#new-ass-classroom");

    const hideAssList = () => {
      AssList.style.display = "none";
    }

    const hideNewAssForm = () => {
      newAssForm.style.display = "none";
    }

    const showAssList = () => {
      AssList.style.display = "";
    }

    const showNewAssForm = () => {
      newAssForm.style.display = "";
    }


    const showLoader = () => {
      pageLoader.style.display = "";
      sectionAss.style.display = "none";
    }

    const loadClassRoomsToDropDown = () => {
      const classrooms = JSON.parse(localStorage.getItem("classrooms@os"));
      classrooms.forEach((classroom) => {
        const option = document.createElement("option");
        option.innerText = classroom.name;
        option.setAttribute("value", classroom.id);
        newAssClassRoom.append(option);
      })
    }

    const createAndAppendPendingAndCheckedAssLi = ({name, description, deadline, scored_marks, total_marks}) => {
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
                  Unchecked
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
                  Checked (${scored_marks}/${total_marks})
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

      if (scored_marks === 0 || scored_marks === null) {
        const newEli = document.createElement("li");
        newEli.innerHTML = peli;
        pendingAssList.append(newEli);
      } else {
        const newEli = document.createElement("li");
        newEli.innerHTML = celi;
        checkedAssList.append(newEli);
      }
    }

    const createAssignment  = ({name, description, educatorId, classroomId, total_marks, deadline, submitted}) => {
      showLoader();

      var checkExist = setInterval(() => {
          if (auth.currentUser) {
              clearInterval(checkExist);
              auth.currentUser.getIdToken().then((token) => {
                postAssignment({
                  xToken: token,
                  assignment: {
                    name: name,
                    description: description,
                    educatorId: educatorId,
                    classroomId: classroomId,
                    total_marks: total_marks,
                    deadline: deadline,
                    submitted: submitted
                  }
                }).then((resp) => {
                  location.reload();
                  console.debug(resp);
                }).catch((err) => {
                  console.debug("Assignment add failed");
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

    const validateNewAssForm = () => {
      const name = newAssForm["new-ass-name"].value.trim();
      const desc = newAssForm["new-ass-desc"].value.trim();
      const classroomId = newAssForm["new-ass-classroom"].value;
      const total_marks = parseInt(newAssForm["new-ass-total-marks"].value);
      const deadline = new Date(newAssForm["new-ass-deadline"].value).getTime();
      
      /// tododododo
      let valid = true;

      // name validation
      valid = valid && (name.length > 0);
      valid = valid && (desc.length > 0);
      valid = valid && (classroomId.length > 0);
      valid = valid && Number.isInteger(total_marks);
      valid = valid && (Date.now() < deadline);

      console.debug(valid, name, desc, classroomId, total_marks, deadline);

      return {
          valid: valid,
          name: name,
          description: desc,
          educatorId: userData.id,
          classroomId: classroomId,
          total_marks: parseInt(total_marks),
          deadline: deadline,
          submitted: false
      };
    }
    
    // load assignment list
    var checkExist = setInterval(() => {
        if (localStorage.getItem("assignments@os") !== null) {
          clearInterval(checkExist);
          const data = JSON.parse(localStorage.getItem("assignments@os"));
          data.forEach(ass => {
            createAndAppendPendingAndCheckedAssLi(ass);
          });
        } else {
          if (auth.currentUser) {
            clearInterval(checkExist);
            auth.currentUser.getIdToken().then((token) => {
              getAssignment({
                xToken: token
              }).then((resp) => {
                console.debug(resp);
                localStorage.setItem("assignments@os", JSON.stringify(resp.data));
                resp.data.forEach(ass => {
                  createAndAppendPendingAndCheckedAssLi(ass);
                });
              }).catch((err) => {
                console.debug(err.message);
              })
            }).catch((err) => {
              console.debug(err.message);
            })
          }
        }
    }, 100)


    cancelNewAssignmentForm.addEventListener("click", (e) => {
      e.preventDefault();
      hideNewAssForm();
      showAssList();
    })

    createNewAssBtn.addEventListener("click", (e) => {
      e.preventDefault();
      loadClassRoomsToDropDown();
      hideAssList();
      showNewAssForm();
    })

    newAssForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = validateNewAssForm();
      if (data.valid) {
        createAssignment(data);
      } else {
        errorContainer.style.display = "";
      }
      return false;
    })
  }

}

export default TheEducatorAssignments;