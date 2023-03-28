import React from "react"
import styles from "./taskDetails.module.css"
import { FaFileAlt } from "react-icons/fa";
const TaskDetails = (props) => {
    return (
        <div><div className={styles.modal}>
            <div onClick={props.toggleModal} className={styles.overlay}></div>
            <div className={styles.modalContent}>
                <h2 className={styles.heading}>Task Name: {props.card.name}</h2>
                {props.card.flag !== "default" ? <h5 className={styles.subheading}>Flag: {props.card.flag}</h5> : null}
                <h5 className={styles.subheading} style={{ maxWidth: 250 }} >link to :{props.card.link} </h5>
                <div className={styles.sameLine}>
                    <div>
                        <h5 className={styles.subheading} style={{ maxWidth: 250 }} >Assign to :{props.card.assign} </h5>
                    </div>
                    <div>
                        <h5 className={styles.subheading}>Report to :{props.card.reporter} </h5>
                    </div>
                </div>
                <div className={styles.sameLine}>
                    <div>
                        <h5 className={styles.subheading}>Start Date: {props.card.startDate}</h5>
                    </div>
                    <div>
                        <h5 className={styles.subheading}>End date: {props.card.endDate}</h5>
                    </div>
                </div>
                <h5 className={styles.subheading}>Description:</h5>
                <p className={styles.text}>{props.card.description}</p>
                <h5 className={styles.subheading}>Attachments:</h5>
                <div >{props.card.files.map((att, index) => {
                    return (<div key={index}
                        className={styles.taskDetailsContainer}>
                        <FaFileAlt className={styles.fileIcon} />
                        <div className={styles.attContainer}>
                            <p style={{ margin: 0 }}>{att.location.split("-lenzz")[1]}</p>
                            <a href={att.location} className={styles.downloadATag}>
                                <div className={styles.downloadButton}>
                                    Download
                                </div>
                            </a>
                        </div>
                    </div>
                    )
                })}</div>
                <button onClick={props.toggleModal} className={styles.btn} style={{ backgroundColor: "red" }}>CLOSE</button>
                <button onClick={props.clickedUpdateButton} className={styles.btn} style={{ backgroundColor: "green", marginLeft: "10px" }}>UPDATE</button>
                <button onClick={props.clickedDeleteButton} className={styles.btn} style={{ backgroundColor: "orange", marginLeft: "10px" }}>DELETE</button>
            </div>
        </div></div>
    )
}
export default TaskDetails
