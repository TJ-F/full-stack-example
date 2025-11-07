import CardFooter from 'react-bootstrap/CardFooter'

function FooterComponent() {
    return (
        <CardFooter
            className="text-center py-2 px-3"
            style={{
                backgroundColor: '#f8f9fa',
                color: '#6c757d',
                fontSize: '0.95rem',
                lineHeight: 1.3,
                borderTop: '1px solid #e9ecef'
            }}
        >
            <div style={{ fontWeight: 'bold' }}>Stiles Golf Course</div>
            <div style={{ fontSize: '0.9em' }}>700 Old Golf Ave, Pittsboro, IN</div>
            <div style={{ fontSize: '0.9em' }}>Phone: (317) 555-9220</div>
            <div style={{ fontSize: '0.9em', marginBottom: '0.25em' }}>Email: sgc@sgcgolf.com</div>
            <div style={{ fontSize: '0.85em', color: '#adb5bd' }}>
                &copy; {new Date().getFullYear()} Stiles Golf Course, LLC. All rights reserved.
            </div>
        </CardFooter>
    );
}
export default FooterComponent;