import { postAssignment, getAssignment, putAssignment } from "../../osapi/OsApi.js"
import TheLoader from "./TheLoader.js"

const TheEducatorAssignments = {
  render: async () => {

      let view =  /*html*/`
      <div style="display: none;" id="page_loader_ass" class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div class="w-12 h-12 border-4 border-purple-600 rounded-full loader"></div>
      </div>   
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



      <form id="editass-form" style="display: none;">
        <div id="editass-data" class="bg-white shadow overflow-hidden sm:rounded-lg mt-4">
          
        </div>
        <div class="mt-4 pt-5">
          <div class="flex justify-end">
            <span class="inline-flex rounded-md shadow-sm">
              <button id="cancel-edit-ass" type="button" class="py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
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
    const AssList = document.querySelector("#eass-list");
    const newAssForm = document.querySelector("#newass-form");
    const cancelNewAssignmentForm = document.querySelector("#cancel-new-ass")
    const createNewAssBtn = document.querySelector("#create-new-ass-btn");
    const pendingAssList = document.querySelector("#pending-ass-list");
    const checkedAssList = document.querySelector("#checked-ass-list");
    const newAssClassRoom = document.querySelector("#new-ass-classroom");

    const editAssForm = document.querySelector("#editass-form");
    const cancelEditAssignmentForm = document.querySelector("#cancel-edit-ass");
    const editAssData = document.querySelector("#editass-data");

    const hideEditAssForm = () => {
      editAssForm.style.display = "none";
    }

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

    const loadClassRoomsToDropDown = () => {
      const classrooms = JSON.parse(localStorage.getItem("classrooms@os"));
      classrooms.forEach((classroom) => {
        const option = document.createElement("option");
        option.innerText = classroom.name;
        option.setAttribute("value", classroom.id);
        newAssClassRoom.append(option);
      })
    }

    const createAndAppendPendingAndCheckedAssLi = (ass) => {
      const {name, description, deadline, scored_marks, total_marks, checked, submitted} = ass;
      const shortDesc = description.slice(0, 25) + "...";
      const date = new Date(deadline);
      const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
      const dateString = date.toLocaleDateString("en-US", options);
      const submittedString = `<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Submitted</span>`
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
                ${submitted ? submittedString: ""}
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

      const newEli = document.createElement("li");
      newEli.setAttribute("class", "cursor-pointer");
      newEli.setAttribute("data", JSON.stringify(ass));
      if (checked === false) {
        newEli.innerHTML = peli;
        pendingAssList.append(newEli);
      } else {
        newEli.innerHTML = celi;
        checkedAssList.append(newEli);
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

    const showAssignmentEditForm = ({id, description, solution, total_marks, name, submitted}) => {
      hideAssList();
      editAssData.innerHTML = "";
      editAssData.setAttribute("id", id);
      const dataDiv = document.createElement("div");
      if (!submitted) {
        solution = "Not Submitted"
      }
      dataDiv.setAttribute("class", "px-4 py-5 border-b border-gray-200 sm:px-6");
      const data = `<h3 class="text-lg leading-6 font-medium text-gray-900">
          ${name}
        </h3>
        <p class="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
          Please add marks if the student submitted the assignment.
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
              ${solution}
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
              <input id="edit-ass-scored-marks" type="number" class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">
            </dd>
          </div>
        </dl>`
      dataDiv.innerHTML = data;
      editAssData.append(dataDiv);
      showEditAssForm();
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

    const updateAssignment = ({id, scored_marks}) => {
      
      showLoader();

      var checkExist = setInterval(() => {
        if (auth.currentUser) {
            clearInterval(checkExist);
            auth.currentUser.getIdToken().then((token) => {
              putAssignment({
                xToken: token,
                assignment: {
                  id: id,
                  scored_marks: scored_marks
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

    const validateEditAssForm = () => {
      const marks = parseInt(editAssForm["edit-ass-scored-marks"].value);
      const assignmentId = editAssData.getAttribute("id");
      let valid = Number.isInteger(marks);
      valid = valid && (assignmentId != null) && (assignmentId !== "");

      console.debug(valid, marks, assignmentId);
      
      return {
        valid: valid,
        id: assignmentId,
        scored_marks: marks
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
              checkedAssList.innerHTML = "";
              resp.data.forEach(ass => {
                createAndAppendPendingAndCheckedAssLi(ass);
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

    cancelNewAssignmentForm.addEventListener("click", (e) => {
      e.preventDefault();
      hideNewAssForm();
      showAssList();
    })

    cancelEditAssignmentForm.addEventListener("click", (e) => {
      e.preventDefault();
      hideEditAssForm();
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

export default TheEducatorAssignments;