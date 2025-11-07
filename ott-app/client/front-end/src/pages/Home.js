// import react from "react";

function Home() {

    return (
        <div style={{
            minHeight: '100vh',
            width: '100vw',
            display: 'flex',
            backgroundImage: `url(${require('../images/golf_login.jpg')})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundAttachment: 'fixed',
            padding: 0,
            margin: 0,
        }}>
            <div
                className="container mt-5"
                style={{
                    height: "50%",
                    background: "rgba(255,255,255,0.85)",
                    borderRadius: "8px",
                    padding: "2rem",
                    marginTop: "3rem"
                }}
            >
                <h1>Welcome to Stiles Golf Course</h1>
                <p className="lead">Championship Golf - Close to Home</p>
                <p>
                    Thank you for visiting Stiles Golf Course! We look forward to your next round of golf, or event outing! Explore our course information, book tee times, and enjoy your day on the greens.
                </p>
                <h2>History</h2>
                <p>Stiles Golf Course (SGC) is an 18-hole golf course located in Pittsboro Indiana, USA. The course
                    was designed by Pete Miller in 1978, and built by its current owner, John Stiles. SGC is a par 72
                    course with a total length of 6,500 yards. The course is known for its challenging layout, and fast greens.
                    
                    Stiles Golf Course is operated and maintained by its 12 employees. All of which are all passionate about golf, have
                    made great memories working at Stiles, and plan to keep the golf course going for future generations. Many
                    of their parents used to play or still play golf at Stiles Golf Course. 
                    <br />
                    <br />
                    <b>The mission</b> of Stiles Golf Course has
                    always been to provide great golf to the community, at a reasonable price.</p>
            </div>
        </div>
    );
}
export default Home;