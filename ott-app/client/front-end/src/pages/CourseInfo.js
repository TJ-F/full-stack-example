import 'bootstrap/dist/css/bootstrap.min.css';
const CourseInfo = () => {
  const imageStyle = {
    width: '120px',
    height: '120px',
    objectFit: 'contain',
    display: 'block',
    margin: '0 auto'
  };

  return (
    <>
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
        <div className="container" style={{ padding: 0 }}>
          <div className="row align-items-center mt-5 mb-3">
            <div className="col-12 d-flex flex-column align-items-start">
              <h2 className="text-start" style={{ background: '#fff', display: 'inline-block', padding: '0.25em 0.75em', borderRadius: '6px' }}>Front</h2>
            </div>
          </div>
          <div className="row mt-4 mb-4">
            {Array.from({ length: 9 }).map((_, idx) => (
              <div
                className="col-12 col-md-4 mb-4 d-flex flex-column align-items-center"
                key={idx}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '16px',
                  background: '#fff'
                }}
              >
                <img
                  src={`/images/holes/hole${idx + 1}.svg`}
                  alt={`Hole ${idx + 1}`}
                  style={{ ...imageStyle, marginBottom: '16px' }}
                />
                <div className="text-center mt-2">Hole {idx + 1}</div>
              </div>
            ))}
          </div>
          <div className="row align-items-center mb-3">
            <div className="col-12 d-flex flex-column align-items-start">
              <h2 className="text-start" style={{ background: '#fff', display: 'inline-block', padding: '0.25em 0.75em', borderRadius: '6px' }}>Back</h2>
            </div>
          </div>
          <div className="row">
            {Array.from({ length: 9 }).map((_, idx) => (
              <div
                className="col-12 col-md-4 mb-4 d-flex flex-column align-items-center"
                key={idx}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '16px',
                  background: '#fff'
                }}
              >
                <img
                  src={`/images/holes/hole${idx + 1}.svg`}
                  alt={`Hole ${idx + 1}`}
                  style={{ ...imageStyle, transform: 'rotate(180deg)', marginBottom: '16px' }}
                />
                <div className="text-center mt-2">Hole {idx + 10}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseInfo;
