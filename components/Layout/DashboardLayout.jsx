function DashboardLayout({ children }) {
    return (
        <div className="dashboard-container">
            <nav className="nav-header">
                <div className="nav-content">
                    <div className="nav-wrapper">
                        <div className="nav-left">
                            {/* Logo container */}
                            <div className="logo-container">
                                <img
                                    src="/images/logo.png"
                                    alt="El Mustafa Egitim TV"
                                />
                            </div>
                            <div className="nav-menu">
                                {/* Add your nav items here */}
                            </div>
                        </div>
                        <div className="user-menu">
                            {/* Add user menu items here */}
                        </div>
                    </div>
                </div>
            </nav>

            <main className="main-content">
                <div className="main-container">{children}</div>
            </main>
        </div>
    );
}

export default DashboardLayout;
