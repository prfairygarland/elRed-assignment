import { Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import RatingDetails from "./RatingDetails";

const ethicalApiUrl = "https://newpublicbucket.s3.us-east-2.amazonaws.com/reactLiveAssignment/JsonFiles/RatingsEthicalCodeResponse.json";
const realMetApiUrl = "https://newpublicbucket.s3.us-east-2.amazonaws.com/reactLiveAssignment/JsonFiles/RatingsVirtuallyMetResponse.json";
const Ratings = () => {
    const [ ethicalData, setEthicalData ] = useState("");
    const [ realMetData, setRealMetData ] = useState("");

    const [showEthicalModal, setShowEthicalModal] = useState(false);
    const [showRealMetModal, setShowRealMetModal] = useState(false)
    useEffect(() => {
        fetch(ethicalApiUrl)
            .then((res) => res.json())
            .then((json) => {
                setEthicalData(json)
            }).catch((error) => {
                setEthicalData("")
            })

        fetch(realMetApiUrl)
            .then((res) => res.json())
            .then((json) => {
                setRealMetData(json)
            }).catch((error) => {
                setRealMetData("")
            })
    }, [])
    return(
        <div style={{display: "flex", flexDirection: "column", backgroundColor: "#75767a", color:"white", borderRadius: "15px", padding: "10px"}}>
            <div style={{marginBottom: "10px"}}>Ratings</div>
            <div style={{display: "flex", flexDirection: "row", cursor: "pointer", margin: "5px 0px"}} onClick={() => setShowEthicalModal(true)}>
                <div>{ethicalData ? ethicalData?.ethicalCodeCount : 0}</div>
                <div style={{marginLeft: "20px"}}>Say has ethical code of conduct and is safe to do business with</div>
            </div>
            <hr style={{height: "0.1px", width: "100%", color: "gray", backgroundColor: "gray"}}></hr>
            <div style={{display: "flex", flexDirection: "row", cursor: "pointer", margin: "5px 0px"}} onClick={() => setShowRealMetModal(true)}>
                <div>{realMetData ? realMetData?.virtuallyMetCount : 0}</div>
                <div style={{marginLeft: "20px"}}>Have met in real life/Video call</div>
            </div>

            <Modal className="App"
                open={showEthicalModal}
                onClose={() => setShowEthicalModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <div style={{backgroundColor: "white", padding: "10px", overflow: "scroll", maxHeight: "80vh"}}>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <div>{ethicalData ? ethicalData?.ethicalCodeCount : 0} say has ehtical code of conduct</div>
                        <div style={{cursor: "pointer"}} onClick={() => setShowEthicalModal(false)}>
                            <CloseIcon />
                        </div>
                   </div>
                   <RatingDetails data={ethicalData} />
                </div>
            </Modal>

            <Modal className="App"
                open={showRealMetModal}
                onClose={() => setShowRealMetModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <div style={{backgroundColor: "white", padding: "10px", overflow: "scroll", maxHeight: "80vh"}}>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <div>{realMetData ? realMetData?.virtuallyMetCount : 0} have met in real life/video call</div>
                        <div style={{cursor: "pointer"}} onClick={() => setShowRealMetModal(false)}>
                            <CloseIcon />
                        </div>
                   </div>
                   <RatingDetails data={realMetData} />
                </div>
            </Modal>
        </div>
    )
}

export default Ratings;