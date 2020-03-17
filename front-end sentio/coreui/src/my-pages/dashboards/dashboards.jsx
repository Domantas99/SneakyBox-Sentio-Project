import React, { useEffect } from 'react'
import { connect } from 'react-redux'


function Dashboards(props) {
    return (
        <div>
            {console.log("cia db dashboards")}
            <h1>Welcome to dashboards list page</h1>
            {/* There will be displayed list of created dashboards, and you will be able to create one */}
        </div>
    )
}



const mapStateToProps = state => ({state});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboards);