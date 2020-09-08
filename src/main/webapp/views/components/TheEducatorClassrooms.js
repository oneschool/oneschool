import { getClassroom, getClassroomStudents , postClassroom, postClassroomAddStudents } from "../../osapi/OsApi.js"
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
                  New classroom
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
      <form id="newclassroom-form"  style="display: none;">
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

        <div class="mt-4" id="newclassroom-selected-students">
        </div>

        <!-- Add student to list section -->
        <div class="sm:col-span-6 mt-6">
          <div class="flex justify-between">
            <label for="new-student-classroom" class="block text-sm font-medium leading-5 text-gray-700">Add students to classroom</label>
          </div>
          <div class="mt-1 relative rounded-md shadow-sm">
            <input id="new-student-classroom" class="form-input block w-full sm:text-sm sm:leading-5" placeholder="Search name or email" aria-describedby="email-optional">
          </div>
          <p class="mt-2 text-sm text-gray-500">Click on any student's card to add.</p>
        </div>

        <ul id="newclassroom-students-in-view" class="cursor-pointer grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-4">
        </ul>


        <div class="mt-8 border-t border-gray-200 pt-5">
          <div class="flex justify-end">
            <span class="inline-flex rounded-md shadow-sm">
              <button id="cancel-new-cr" type="button" class="py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
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
    const sectionCR = document.querySelector("#cr-section");
    
    const userData = JSON.parse(localStorage.getItem("user@os"));
    const classRoomList = document.querySelector("#eclassroom-list");
    const classRoomTBody = document.querySelector("#eclassroom-tbody");
    const newClassRoomForm = document.querySelector("#newclassroom-form");
    const cancelNewClassRoomForm = document.querySelector("#cancel-new-cr")
    const createNewClassRoomBtn = document.querySelector("#create-new-cr-btn");
    const newCRName = document.querySelector("#new-cr-name");
    const newCRDesc = document.querySelector("#new-cr-desc");
    const newStudentSearchInput = document.querySelector("#new-student-classroom");
    const selectedStudentsDiv = document.querySelector("#newclassroom-selected-students");
    const studentsInView = document.querySelector("#newclassroom-students-in-view");

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

    const getClosestParent = (elem, selector) => {
      let count = 0;
      for ( ; elem && elem !== document; elem = elem.parentNode ) {
        if ( elem.matches( selector ) ) return elem;
        count++;
        if (count > 5) return null;
      }
      return null;
    }

    const getClassroomStudentObjectArray = (classroomId) => {
      const arr = []
      const spans = selectedStudentsDiv.getElementsByTagName("span");
      for (const span of spans) {
        const id = span.getAttribute("id");
        if (id !== null) {
          arr.push({
            classroomId: classroomId,
            studentId: id
          });
        }
      }
      return arr;
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

    const hideLoader = () => {
      pageLoader.style.display = "none";
      sectionCR.style.display = "";
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
                  console.debug(resp);
                  // hack from backend
                  const classroomId = resp.data.message;
                  const classroomStudents = getClassroomStudentObjectArray(classroomId);
                  if (classroomStudents.length === 0) {
                    hideNewClassRoomForm();
                    fetchClassrooms();
                    hideLoader();
                    showClassRoomList();
                    return;
                  }
                  postClassroomAddStudents({
                    xToken: token,
                    classroomStudents: {
                      classroomStudents: classroomStudents
                    }
                  }).then((resp) => {
                    console.debug(resp.data);
                    hideNewClassRoomForm();
                    fetchClassrooms();
                    hideLoader();
                    showClassRoomList();
                  }).catch((err) => {
                    console.debug(err.message);
                    console.debug("class addedd, but student addition to class failed");
                  })
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

    const clearStudentsInView = () => {
      studentsInView.innerHTML = "";
    }

    const searchStudentAndAddToView = (searchTerm) => {
      const students = JSON.parse(localStorage.getItem("students@os"));

      const filteredStudents = students.filter((student) => {
        const name = student.name.toLowerCase();
        const email = student.email.toLowerCase();
        const searchTermLowerCase = searchTerm.toLowerCase();
  
        return (
          name.indexOf(searchTermLowerCase) > -1 ||
          email.indexOf(searchTermLowerCase) > -1
        );
      });
      clearStudentsInView();
      filteredStudents.forEach((student) => {
        addStudentToInViewList(student);
      })
    }

    const addStudentToSelectedDiv = (element) => {
      
      const childSpans = selectedStudentsDiv.getElementsByTagName("span");
      const id = element.getAttribute("id");

      // already present i.e. selected
      for (const childSpan of childSpans) {
        if (childSpan.getAttribute("id") === id) {
          return;
        }
      }
      

      const name = element.getAttribute("name");
      const span = document.createElement("span");
      span.setAttribute("selected", true);
      span.setAttribute("id", id);
      span.setAttribute("class", "inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-indigo-100 text-indigo-800")
      span.innerHTML = `${name}
      <button type="button" class="flex-shrink-0 -mr-0.5 ml-1.5 inline-flex text-indigo-500 focus:outline-none focus:text-indigo-700" aria-label="Remove large badge">
        <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
          <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
        </svg>
      </button>
      `
      selectedStudentsDiv.append(span);
    }

    const addStudentToInViewList = ({id, name, email}) => {
      const childLis = studentsInView.getElementsByTagName("li");
      console.debug(childLis.length)
      // 6 elements max
      if (childLis.length >= 12) return;
      const view = document.createElement("li");
      view.innerHTML = `<li student="true" id="${id}" name="${name}" class="col-span-1 bg-white rounded-lg shadow">
        <div class="w-full flex items-center justify-between p-6 space-x-6">
          <div class="flex-1 truncate">
            <div class="flex items-center space-x-3">
              <h3 class="text-gray-900 text-sm leading-5 font-medium truncate">${name}</h3>
              <span class="flex-shrink-0 inline-block px-2 py-0.5 text-teal-800 text-xs leading-4 font-medium bg-teal-100 rounded-full">Student</span>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-200">
          <div class="-mt-px flex">
            <div class="w-0 flex-1 flex border-r border-gray-200">
              <a class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm leading-5 text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 transition ease-in-out duration-150">
                <svg class="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span class="ml-3">${email}</span>
              </a>
            </div>
          </div>
        </div>
      </li>`
      studentsInView.append(view);
    }
    
    const fetchClassrooms = () => {

      // load classroom list and all students
      var checkExist = setInterval(() => {
        if (auth.currentUser) {
          clearInterval(checkExist);
          auth.currentUser.getIdToken().then((token) => {
            getClassroom({
              xToken: token
            }).then((resp) => {
              console.debug(resp);
                    localStorage.setItem("classrooms@os", JSON.stringify(resp.data));
                    classRoomTBody.innerHTML = "";
                    resp.data.forEach(ass => {
                      createAndAppendClassroomTr(ass);
                    });
                  }).catch((err) => {
                    console.debug(err.message);
                  })
                  
                  getClassroomStudents({
                    xToken: token
                  }).then((resp) => {
                    console.debug(resp);
                    localStorage.setItem("students@os", JSON.stringify(resp.data));
                    resp.data.forEach((student) => {
                      addStudentToInViewList(student);
                    })
                  }).catch((err) => {
                    console.debug(err.message);
                  })
                }).catch((err) => {
                  console.debug(err.message);
                })
        }
      }, 100)       
    }

    fetchClassrooms();



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

    newStudentSearchInput.addEventListener("input", (e) => {
      e.preventDefault();
      console.debug(e.target.value);
      searchStudentAndAddToView(e.target.value);
    })

    newClassRoomForm.addEventListener("submit", (e) => {
      e.preventDefault();
      checkFormValuesAndSubmit({name: newCRName.value, description: newCRDesc.value});
      console.debug(newCRName.value, newCRDesc.value);
      return false;
    })

    selectedStudentsDiv.addEventListener("click", (e) => {
      const parentSpan = getClosestParent(e.target, "span");
      if (parentSpan) {
        console.debug(parentSpan)
        parentSpan.remove();
      }
    })

    studentsInView.addEventListener("click", (e) => {
      const parentLi = getClosestParent(e.target, "li");
      if (parentLi) {
        console.debug(parentLi);
        addStudentToSelectedDiv(parentLi);
      }
    })
  }
}

export default TheEducatorClassrooms;