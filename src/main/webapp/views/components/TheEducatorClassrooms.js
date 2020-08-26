import { getClassroom, postClassroom } from "../../osapi/OsApi.js"
import TheLoader from "./TheLoader.js"

const TheEducatorClassrooms = {
  render: async () => {

      const Loader = await TheLoader.render();

      let view =  /*html*/`
      ${Loader}
      <div id="cr-section">
      <div class="bg-white overflow-hidden sm:rounded-lg sm:shadow">
        <div class="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
          <div class="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-no-wrap">
            <div class="ml-4 mt-2">
            </div>
            <div class="ml-4 mt-2 flex-shrink-0">
              <span class="inline-flex rounded-md shadow-sm">
                <button id="create-new-cr-btn" type="button"
                  class="cursor-pointer relative inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700">
                  Create new classroom
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div id="eclassroom-list">
        <div class="flex flex-col">
          <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th
                        class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Classroom
                      </th>
                      <th
                        class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <!-- <th class="px-6 py-3 bg-gray-50"></th> -->
                    </tr>
                  </thead>
                  <tbody id="eclassroom-tbody">
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- form begin -->
      <form id="newclassroom-form" style="display: none;">
        <div>
          <div>
            <div class="mt-6 grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">
              <div class="sm:col-span-4">
                <label for="new-cr-name" class="block text-sm font-medium leading-5 text-gray-700">
                  Classroom Name
                </label>
                <div class="sm:col-span-6">
                  <input id="new-cr-name" class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                </div>
              </div>

              <div class="sm:col-span-6">
                <label for="new-cr-desc" class="block text-sm font-medium leading-5 text-gray-700">
                  Description
                </label>
                <div class="mt-1 rounded-md shadow-sm">
                  <textarea id="new-cr-desc" rows="3" class="form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"></textarea>
                </div>
                <p class="mt-2 text-sm text-gray-500">Enter any metadata about the classroom.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-8 border-t border-gray-200 pt-5">
          <div class="flex justify-end">
            <span class="inline-flex rounded-md shadow-sm">
              <button id="cancel-new-cr" type="button" class="py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
                Cancel
              </button>
            </span>
            <span class="ml-3 inline-flex rounded-md shadow-sm">
              <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                Save
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
    const sectionCR = document.querySelector("#cr-section");
    
    const userData = JSON.parse(localStorage.getItem("user@os"));
    const classRoomList = document.querySelector("#eclassroom-list");
    const classRoomTBody = document.querySelector("#eclassroom-tbody");
    const newClassRoomForm = document.querySelector("#newclassroom-form");
    const cancelNewClassRoomForm = document.querySelector("#cancel-new-cr")
    const createNewClassRoomBtn = document.querySelector("#create-new-cr-btn");
    const newCRName = document.querySelector("#new-cr-name");
    const newCRDesc = document.querySelector("#new-cr-desc");

    const createAndAppendClassroomTr = ({name, created}, even) => {
        const creationDate = new Date(created);
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        const dateString = creationDate.toLocaleDateString("en-US", options);
        const row = ` <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                        ${name}
                      </td>
                      <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                        ${dateString}
                      </td>`;

        const newTRow = document.createElement("tr");
        newTRow.classList.add(even ? "bg-gray-50" : "bg-white");
        newTRow.innerHTML = row;
        classRoomTBody.append(newTRow);

    }
    const hideClassRoomList = () => {
      classRoomList.style.display = "none";
    }

    const hideNewClassRoomForm = () => {
      newClassRoomForm.style.display = "none";
    }

    const showClassRoomList = () => {
      classRoomList.style.display = "";
    }

    const showNewClassRoomForm = () => {
      newClassRoomForm.style.display = "";
    }


    const showLoader = () => {
      pageLoader.style.display = "";
      sectionCR.style.display = "none";
    }

    const createClassroom  = ({name, description}) => {
      
      showLoader();

      var checkExist = setInterval(() => {
          if (auth.currentUser) {
              clearInterval(checkExist);
              auth.currentUser.getIdToken().then((token) => {
                postClassroom({
                  xToken: token,
                  classroom: {
                    name: name,
                    description: description
                  }
                }).then((resp) => {
                  location.reload();
                  console.debug(resp);
                }).catch((err) => {
                  console.debug("Class add failed");
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

    const checkFormValuesAndSubmit = ({name, description}) => {
      name = name?.trim();
      description = description?.trim();
      if (name?.length > 0 && description?.length) {
        createClassroom({name, description});
      }
    }
    
    // load classroom list
    var checkExist = setInterval(() => {
        if (auth.currentUser) {
            clearInterval(checkExist);
            auth.currentUser.getIdToken().then((token) => {
                getClassroom({
                    xToken: token
                }).then((resp) => {
                    console.debug(resp);
                    resp.data.forEach(ass => {
                      createAndAppendClassroomTr(ass);
                    });
                }).catch((err) => {
                  console.debug(err.message);
                })
            }).catch((err) => {
                console.debug(err.message);
            })
        }
    }, 100)

    cancelNewClassRoomForm.addEventListener("click", (e) => {
      e.preventDefault();
      hideNewClassRoomForm();
      showClassRoomList();
    })

    createNewClassRoomBtn.addEventListener("click", (e) => {
      e.preventDefault();
      hideClassRoomList();
      showNewClassRoomForm();
    })

    newClassRoomForm.addEventListener("submit", (e) => {
      e.preventDefault();
      checkFormValuesAndSubmit({name: newCRName.value, description: newCRDesc.value});
      console.debug(newCRName.value, newCRDesc.value);
      return false;
    })
  }

}

export default TheEducatorClassrooms;