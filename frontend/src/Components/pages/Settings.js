import { useState } from "react";
import SideBar from "./Sidebar";
import { FaAngleDown, FaAngleUp, FaPencilAlt } from "react-icons/fa";
import styles from "./Settings.module.css";
import { useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import MemberCard from "./ProjectSettings/MemberCard"
import MemberSearchItem from "./ProjectSettings/MemberSearchItem"

// import "./Settings.css"

const Settings = () => {
  const [showBasicSettingContent, setShowBasicSettingContent] = useState(false);
  const [showAddMemberSettingContent, setShowAddMemberSettingContent] = useState(true);
  const [showNotificationSettingContent, setShowNotificationSettingContent] = useState(false);
  const [localProject, SetLocalProject] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState({});
  const [projectDetails, SetProjectDetails] = useState({})

  const [projectMembersData, SetProjectMembersData] = useState([])
  const [companyMembersData, SetCompanyMembersData] = useState([])
  const [searchResultsData, SetSearchResultsData] = useState([])
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [searchEmpty, setSearchEmpty] = useState(false);
  const [mouseInItems, setMouseInItems] = useState(false);
  const [membersCount, setMembersCount] = useState(0);


  const keys = ["firstName", "lastName", "email"];




  const toggleBasicSettingContent = () => {
    setShowBasicSettingContent(!showBasicSettingContent);
  };
  const toggleAddMemberSettingContent = () => {
    setShowAddMemberSettingContent(!showAddMemberSettingContent);
  };
  const toggleNotificationSettingContent = () => {
    setShowNotificationSettingContent(!showNotificationSettingContent);
  };

  const LocalUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const getLocalStorageProject = async () => {
      const localPro = await JSON.parse(localStorage.getItem("last access project"));
      console.log("localPro", localPro)
      SetLocalProject(localPro)
    }

    getLocalStorageProject();
  }, []);


  useEffect(() => {
    const getProject = async () => {
      const data = {
        id: localProject.projectId
      }
      await axios.post('http://localhost:4000/api/project/getProject', data)
        .then(res => {
          console.log(res.data.project)
          SetProjectDetails(res.data.project);
          setName(res.data.project.projectname);
          setDescription(res.data.project.description);
          setStartDate(res.data.project.startDate)
          setEndDate(res.data.project.endDate)
        }).catch(err => {
          console.log(err)
        })
    }



    if (localProject.projectId) {
      getProject();
    }

  }, [projectDetails._id, localProject.projectId])

  useEffect(() => {
    const getCompanyUsers = async () => {
      const data = {
        companyId: projectDetails.company_id
      }
      await axios.post('http://localhost:4000/api/user/getUserFromCompany', data)
        .then(res => {
          console.log(",,,,,,,,,,,,,,,,,,,,", res.data)
          SetCompanyMembersData(res.data)

        }).catch(err => {
          console.log(err)
        })
    }
    getCompanyUsers();
  }, [projectDetails])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      id: projectDetails._id,
      projectname: name,
      description: description,
      startDate: startDate,
      endDate: endDate
    }
    await axios.put("http://localhost:4000/api/project/updateProjectData", formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LocalUser.token}`,
      }
    }).then(res => {
      console.log(res.data);
      showSuccessAlert();
      setError(null)

    }).catch(err => {
      console.log(err.response.data);
      setError(err.response.data.error)
    })
  };

  const showSuccessAlert = () => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      text: 'Your data has been saved',
      showConfirmButton: false,
      timer: 1200,
      width: '250px'
    })
  };

  const deleteErrorAlert = () => {
    Swal.fire({
      position: 'center',
      icon: 'error',
      text: 'cant delete data',
      showConfirmButton: true,
      timer: 1200,
      width: '250px'
    })
  };
  useEffect(() => {
    const getAllUsers = async () => {
      const data = {
        id: localProject.projectId,
      };
      await axios
        .post("http://localhost:4000/api/project/usersOfTheProject", data)
        .then((res) => {
          console.log("bbbbbbbbbbbbbbbbbbbbbb", res.data);
          SetProjectMembersData(res.data);
          setMembersCount(res.data.length);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (localProject.projectId) {
      getAllUsers();
    }
  }, [localProject.projectId, SetProjectMembersData, searchEmpty, membersCount]);

  useEffect(() => {
    if (query.length > 0) {
      const a = companyMembersData.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(query))
      );
      SetSearchResultsData(a);
      console.log(a)
    }

  }, [query])

  const searchFunction = (e) => {
    if (e.target.value.length === 0) {
      setSearchEmpty(true)
    } else {
      setSearchEmpty(false)
    }
    setQuery(e.target.value.toLowerCase());
  }
  const searchOnFocusHandler = (e) => {
    console.log("searchOnFocusHandler", e.target.value)
    if (e.target.value.length > 0) {
      setSearchEmpty(false)
    } else {
      setSearchEmpty(true)
    }
  }
  const searchOnBlurHandler = (e) => {
    if (!mouseInItems) {
      setTimeout(() => {
        setSearchEmpty(true);
      }, 100);
      e.target.value = "";
    }
  }

  const toggleSearchItem = () => {
    setSearchEmpty(!searchEmpty);
  }

  return (
    <SideBar>
      <div className={styles.settings}>

        <div className={styles.dropDown}>
          <div onClick={toggleBasicSettingContent} className={styles.dropDownButton} >
            <div className={styles.dropDownButtonContainer}>
              <div
                className={styles.dropDownTextContainer}
              >
                <h3 >basic Settings</h3>
              </div>
              <div>
                {showBasicSettingContent ? <FaAngleUp className={styles.icon} /> : <FaAngleDown className={styles.icon} />}
              </div>
            </div>
          </div>
          {showBasicSettingContent && (
            <div className={styles.settingsContainer}>
              <div className={styles.settingsPart}>


                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', marginBottom: "10px" }}>
                  <div style={{}}>
                    <div><label htmlFor="name" style={{ fontWeight: 'bold', }}>Project Name:</label>

                    </div>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ccc', marginBottom: '10px', width: '40%' }}
                    />
                  </div>
                  <div style={{}}>
                    <div>
                      <label htmlFor="description" style={{ fontWeight: 'bold', }}>Project Description:</label>
                    </div>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ccc', marginBottom: '10px', width: '90%' }}
                    />
                  </div>
                  <div style={{ display: "flex" }}>
                    <div style={{ marginBottom: '1rem', marginRight: "50px" }}>
                      <label htmlFor="start-date" style={{ fontWeight: 'bold', }}>Start Date:</label>
                      <input
                        type="date"
                        id="start-date"
                        value={startDate}

                        onChange={(event) => setStartDate(event.target.value)}
                        style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ccc', marginBottom: '10px', width: '100%' }}
                      />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <label htmlFor="end-date" style={{ fontWeight: 'bold', }}>End Date:</label>
                      <input
                        type="date"
                        id="end-date"
                        value={endDate}
                        onChange={(event) => setEndDate(event.target.value)}
                        style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ccc', marginBottom: '10px', width: '100%' }}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: "" }}>
                    <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#0077cc', color: '#fff', border: 'none', borderRadius: '0.25rem', cursor: 'pointer', width: '150px', }}>Save Changes</button>
                  </div>

                </form>
                <div style={{ display: "flex", justifyContent: "center" }}>{error && (
                  <div
                    className="error"
                    style={{
                      padding: " 10px",
                      paddingLeft: "65px",
                      background: " #ffefef",
                      border: " 1px solid var(--error)",
                      color: "red",
                      borderRadius: "15px",
                      margin: " 10px 0",
                      marginRight: "55px",
                      width: " 440px",
                    }}
                  >
                    {error}
                  </div>
                )}</div>




              </div>
            </div>
          )}
        </div>



        <div className={styles.dropDown}>
          <div onClick={toggleAddMemberSettingContent} className={styles.dropDownButton} >
            <div className={styles.dropDownButtonContainer}>
              <div
                className={styles.dropDownTextContainer}
              >
                <h3 >Members Settings</h3>
              </div>
              <div>
                {showAddMemberSettingContent ? <FaAngleUp className={styles.icon} /> : <FaAngleDown className={styles.icon} />}
              </div>
            </div>
          </div>
          {showAddMemberSettingContent && (
            <div className={styles.settingsContainer}>
              <div className={styles.settingsPart}>
                <div style={{ display: "flex", justifyContent: "flex-end", marginRight: "5%", marginBottom: "10px" }}
                >
                  <div style={{ marginTop: "10px", marginRight: "5px" }}><h6>Add New Members : </h6></div>
                  <span style={{ position: "relative" }}>
                    <input
                      type="text"
                      placeholder="Search..."
                      onFocus={(e) => searchOnFocusHandler(e)}
                      onBlur={(e) => searchOnBlurHandler(e)}
                      onChange={(e) => searchFunction(e)}
                      style={{ padding: "10px 30px 10px 10px", border: "1px solid #CCCCCC", borderRadius: "10px", fontSize: "1rem", width: "40%", minWidth: "200px", height: "40px" }}
                    />
                    <i className="fa fa-search" style={{ position: "absolute", top: "50%", right: "10px", transform: "translateY(-50%)", fontSize: "1.2rem", marginRight: "10%" }}></i>
                  </span>
                  <div style={{
                    position: "absolute",
                    marginTop: "42px",
                    marginRight: "2%",
                    background: "#fff",
                    maxWidth: "380px",
                    maxHeight: "450px",
                    overflowY: "auto",
                    border: "1px solid #000",
                    borderRadius: "10px"
                  }}
                    onMouseOver={() => { setMouseInItems(true) }}
                    onMouseLeave={() => { setMouseInItems(false) }}
                  >
                    {searchResultsData && !searchEmpty && searchResultsData.map((user, index) => {
                      return <MemberSearchItem key={index} user={user} toggleSearchItem={toggleSearchItem} projectId={projectDetails._id} />
                    })}

                  </div>
                </div>






                {projectMembersData && projectMembersData.map((member, index) => {
                  return <MemberCard key={index} member={member} projectId={projectDetails._id} setMembersCount={setMembersCount} />
                })}
              </div>
            </div>
          )}
        </div>

        <div className={styles.dropDown}>
          <div onClick={toggleNotificationSettingContent} className={styles.dropDownButton} >
            <div className={styles.dropDownButtonContainer}>
              <div
                className={styles.dropDownTextContainer}
              >
                <h3 >Notification settings</h3>
              </div>
              <div>
                {showNotificationSettingContent ? <FaAngleUp className={styles.icon} /> : <FaAngleDown className={styles.icon} />}
              </div>
            </div>
          </div>
          {showNotificationSettingContent && (
            <div className={styles.settingsContainer}>
              <div className={styles.settingsPart}>
              </div>
            </div>
          )}
        </div>

      </div>
    </SideBar>
  );
};

export default Settings;
