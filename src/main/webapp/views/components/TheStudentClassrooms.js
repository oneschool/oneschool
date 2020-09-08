import { getClassroom, getClassroomStudents , postClassroom, postClassroomAddStudents } from "../../osapi/OsApi.js"
import TheLoader from "./TheLoader.js"

const TheStudentClassrooms = {
  render: async () => {

      const Loader = await TheLoader.render();

      let view =  /*html*/`
      ${Loader}
      <div id="cr-section">
      <div id="sclassroom-list">
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
                  <tbody id="sclassroom-tbody">
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
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
    const classRoomList = document.querySelector("#sclassroom-list");
    const classRoomTBody = document.querySelector("#sclassroom-tbody");

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


    const hideClassRoomList = () => {
      classRoomList.style.display = "none";
    }

    const showClassRoomList = () => {
      classRoomList.style.display = "";
    }

    const showLoader = () => {
      pageLoader.style.display = "";
      sectionCR.style.display = "none";
    }

    const hideLoader = () => {
      pageLoader.style.display = "none";
      sectionCR.style.display = "";
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

                }).catch((err) => {
                  console.debug(err.message);
                })
        }
      }, 100)       
    }

    fetchClassrooms();
  }
}

export default TheStudentClassrooms;