import React, { useState, useRef, useEffect } from "react";
import Edit from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { FormControl, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import resumeLogo from '../assets/resumeLogo.jpg'

const Bio = () => {
    const [ showModal, setShowModal ] = useState(false);
    const [ showResumeModal, setShowResumeModal ] = useState(false);
    const [ showResumeDeleteModal, setShowResumeDeleteModal ] = useState(false);
    const [ aboutMeTxt, setAboutMeTxt ] = useState("");
    const [ bloodGroup, setBloodGroup ] = useState("");
    const [ resumeUrl, setResumeUrl ] = useState("");
    const [ resumeFileName, setResumeFileName ] = useState("");
    const aboutMeTextLimitRef = useRef("");
    const aboutMeDisplayRef = useRef("");
    const bloodGroupDisplayRef = useRef("");

    const state = useSelector(state => state);
    const dispatch = useDispatch()
    const saveHandler = () => {
        dispatch({
            type: "SAVE",
            payload: {
                aboutMeText: aboutMeTxt,
                bloodGroup: bloodGroup,
                resumeUrl: resumeUrl
            }
        })
        setShowModal(false)
    }

    const aboutMeTxtHandler = (value) => {
        if(value.length <= 500) {
            setAboutMeTxt(value);
            aboutMeTextLimitRef.current.innerHTML = `${value.length} / 500`;
        }        
    }

    const handleBloodGroup = (event) => {
        setBloodGroup(event.target.value)
    };

    const resumeUploadHandler = (e) => {
        let file = e.target.files[0];
        if (!file.name.includes('.pdf')) {
            alert('Please Upload A PDF');
        } else {
            const fileUrl = URL.createObjectURL(file);
            setResumeFileName(file.name)
            setResumeUrl(fileUrl);  
        }              
    }

    const deleteResumeHandler = () => {
        setResumeFileName("");
        setResumeUrl("");
        setShowResumeDeleteModal(false);
    }

    useEffect(() => {
        aboutMeDisplayRef.current.value = state.aboutMeText;
        bloodGroupDisplayRef.current.innerHTML = state.bloodGroup;
    }, [state])
    
    return(
        <div>
            <div style={{margin:"20px 0px"}}>
                &lt;&lt;&nbsp;&nbsp;My Bio&nbsp;&nbsp;&gt;&gt;
            </div>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "20px"}}>
                <div>About me</div>
                <div onClick={() => setShowModal(true)} style={{cursor: "pointer"}}><Edit/></div>
            </div>
            <div>
                <TextField id="standard-basic" disabled fullWidth multiline variant="standard" inputRef={aboutMeDisplayRef} />
            </div>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "20px"}}>
                <div>Blood group</div>
                <div><span ref={bloodGroupDisplayRef}></span></div>
            </div>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "20px"}}>
                <div style={{display: "flex", flexDirection: "row"}}>
                    <img src={resumeLogo} alt="resumeLogo" style={{width: "40px"}}></img>
                    <span style={{marginTop: "10px"}}>Resume</span>
                </div>
                <div onClick={() => setShowResumeModal(true)}><InfoIcon/></div>
            </div>
            <Modal className="App"
                open={showResumeDeleteModal}
                onClose={() => setShowResumeDeleteModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <div style={{backgroundColor: "white", padding: "10px"}}>
                    Are you sure you want to delete your resume?
                    <div style={{display: "flex", justifyContent: "center", paddingTop: "20px" }}>
                        <button style={{borderRadius: "20px", backgroundColor: "#e94545", color: "white",
                        border: "0", padding: "10px 35px", margin: "0px 10px", cursor: "pointer"}} onClick={() => setShowResumeDeleteModal(false)}>Cancel</button>
                        <button style={{borderRadius: "20px", backgroundColor: "#e94545", color: "white",
                        border: "0", padding: "10px 50px", margin: "0px 10px", cursor: "pointer"}} onClick={deleteResumeHandler}>Yes</button>
                    </div>
                </div>
            </Modal>
            <Modal className="App"
                open={showResumeModal}
                onClose={() => setShowResumeModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <div style={{backgroundColor: "white", padding: "10px"}}>
                {resumeUrl && <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", margin: "10px"}}>
                        <div>{resumeFileName}</div>
                        <div style={{display: "flex", justifyContent: "end", cursor: "pointer"}} onClick={() => setShowResumeModal(false)}>
                            <CloseIcon />
                        </div>
                    </div>}
                {resumeUrl && <object id="pdftest" data={resumeUrl}
                        width="100%"
                        height="500">
                </object>}
                {!resumeUrl && <div>Resume Not Uploaded</div>}
                </div>
            </Modal>
            <Modal className="App"
                open={showModal}
                onClose={() => setShowModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                    
                <div style={{backgroundColor: "white", padding: "10px"}}>
                    <div style={{display: "flex", justifyContent: "end", cursor: "pointer"}} onClick={() => setShowModal(false)}>
                        <CloseIcon />
                    </div>
                    <div>
                        Write something about yourself
                        <TextField id="standard-basic" label="Write something here..."
                        value={aboutMeTxt} onChange={(e) => aboutMeTxtHandler(e.target.value)} fullWidth multiline variant="standard"/>
                        <span style={{display:"flex", justifyContent: "end", fontSize: "10px"}} ref={aboutMeTextLimitRef}>{aboutMeTxt.length}/500</span>
                    </div>
                    {!resumeFileName && <div style={{display: "flex", justifyContent: "center", padding: "20px 0px" }}>
                        <input type='file' id='file' 
                        onChange={e => resumeUploadHandler(e)}
                        style={{display: "none", visibility: "hidden"}}/>
                        <label htmlFor="file" style={{borderRadius: "20px", backgroundColor: "rgb(248 240 240)", color: "black",
                            border: "1px solid", padding: "10px 50px", cursor: "pointer"}}>
                            Upload Resume
                        </label>
                        </div>
                    }
                    {resumeFileName && <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", margin: "10px 0px"}}>
                        <div>{resumeFileName}</div>
                        <div style={{cursor: "pointer"}} onClick={() => setShowResumeDeleteModal(true)}>
                            <DeleteForeverIcon />
                        </div>
                    </div>}
                    <FormControl variant="filled" fullWidth style={{marginTop: "10px"}}>
                        <InputLabel id="demo-simple-select-standard-label">Blood Group</InputLabel>
                        <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={bloodGroup}
                        onChange={(e) => handleBloodGroup(e)}
                        label="Blood Group"
                        >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="A+ (Positive)">A+ (Positive)</MenuItem>
                        <MenuItem value="A- (Negative)">A- (Negative)</MenuItem>
                        <MenuItem value="B+ (Positive)">B+ (Positive)</MenuItem>
                        <MenuItem value="B- (Negative)">B- (Negative)</MenuItem>
                        </Select>
                    </FormControl>
                    <div style={{display: "flex", justifyContent: "center", paddingTop: "20px" }}>
                        <button style={{borderRadius: "20px", backgroundColor: "#e94545", color: "white",
                        border: "0", padding: "10px 50px", cursor: "pointer"}} onClick={saveHandler}>Save</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Bio;