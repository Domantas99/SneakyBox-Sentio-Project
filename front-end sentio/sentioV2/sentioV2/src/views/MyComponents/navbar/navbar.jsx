import React from 'react'

export default function Navbar() {
    return (
        <header class="app-header navbar">
            <div class="d-flex bg-light border mb-3">
                <div class="p-2 bg-light border">Dashboard</div>
                <div class="p-2 bg-light border">All metrix</div>
                <div class="ml-auto p-2 bg-light border">UserName</div>
            </div>
        </header>
    )
}
