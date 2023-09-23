const RatingDetails = (props) => {
    return (
        <div>
            {
                props?.data && props?.data?.result.map(item => (
                <><div style={{display: "flex", flexDirection: "row", margin: "10px"}}>
                    <div>
                        <img src={item.dpURL} style={{width: "40px", height: "40px", borderRadius: "20px"}} alt="profilePic"/>
                    </div>
                    <div style={{display: "flex", flexDirection: "column", margin: "5px 15px"}}>
                        <div>{item.firstname} {item.lastname}</div>
                        <div style={{color: "gray", fontSize: "10px"}}>{item.title[0].value}</div>
                    </div>
                </div>
                <hr style={{height: "0.1px", width: "100%", color: "gray", backgroundColor: "gray"}}></hr></>
                ))
            }    
        </div>
    )
}

export default RatingDetails;