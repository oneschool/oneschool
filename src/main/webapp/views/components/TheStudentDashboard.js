import { getAssignment } from "../../osapi/OsApi.js"

const TheStudentDashboard = {
  render: async () => {
      let view =  /*html*/`
        <div class="pb-5 border-b border-gray-200">
        <div class="-ml-2 -mt-2 flex flex-wrap items-baseline">
            <p class="ml-2 mt-1 text-sm leading-5 text-gray-500 truncate">Welcome, </p>
            <h3 id="saccount-name" class="ml-2 mt-2 text-lg leading-6 font-medium text-gray-900">
            </h3>
        </div>
        </div>

        
        <h4 id="saccount-name" class="ml-2 mt-4 text-lg leading-6 font-medium text-gray-900">
        Ongoing Assignments
        </h4>
        <div class="bg-white shadow overflow-hidden sm:rounded-md mt-4">
            <ul id="spending-ass-list">
            </ul>
        </div>

      `
      return view
  },
  after_render: async () => { 
    const userData = JSON.parse(localStorage.getItem("user@os"));
    const welcomeName = document.querySelector("#saccount-name");
    const onGoingAssList = document.querySelector("#spending-ass-list");
    welcomeName.innerText = userData.name.split(" ")[0];
    
    const createAndAppendOngoingAssLi = ({name, description, deadline, submitted, scored_marks, total_marks, checked}) => {
        const shortDesc = description.slice(0, 25) + "...";
        const date = new Date(deadline);
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        const dateString = date.toLocaleDateString("en-US", options);
        const checkedString = `<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Checked: ${scored_marks}/${total_marks}</span>`;
        const eli = `<a class="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
            <div class="px-4 py-4 sm:px-6">
            <div class="flex items-center justify-between">
                <div class="text-sm leading-5 font-medium text-indigo-600 truncate">
                ${name}
                </div>
                <div class="ml-2 flex-shrink-0 flex">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    ${submitted ? "Submitted": ""}
                </span>
                ${checked ? checkedString : ""}
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

        if (Date.now() < deadline) {
            const newEli = document.createElement("li");
            newEli.innerHTML = eli;
            onGoingAssList.append(newEli);
        }

    }
    
    var checkExist = setInterval(() => {
        if (auth.currentUser) {
            clearInterval(checkExist);
            auth.currentUser.getIdToken().then((token) => {
                getAssignment({
                    xToken: token
                }).then((resp) => {
                    console.debug(resp);
                    localStorage.setItem("assignments@os", JSON.stringify(resp.data));
                    const flattenAssigments = (ass) => {
                        ass = ass.filter((as, index, self) => {
                            return index === self.findIndex((t) => (
                                t.assignmentId == as.assignmentId
                            ))
                        })
                        console.debug(ass);
                        return ass;
                    }
                    flattenAssigments(resp.data).forEach(ass => {
                        createAndAppendOngoingAssLi(ass);
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

}

export default TheStudentDashboard;