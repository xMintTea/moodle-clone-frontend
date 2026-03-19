

export default function ProfilePage() {
    return (
        <div className="profile-page">
            <div className="profile-header">
                <h1>Profile</h1>
                <p>Manage your shit</p>
            </div>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "24px"
            }}>
                {/* profile info */}
                <div className="card">
                    <div style={{textAlign: "center", marginBottom: "24px"}}>
                        <img src="" alt=""
                        style={{
                            width: "120px",
                            height: "120px",
                            borderRadius: "50%",
                            margin: "0 auto 16px",
                            objectFit: "cover"
                        }} />
                        <h2>Кабан Кабаныч</h2>
                    </div>
                    <div>
                        <div>
                            <span>🎓</span>
                            <span>Student ID: </span>
                        </div>
                        <div>
                            <span>🏆</span>
                            <span>Оценка</span>
                        </div>
                    </div>
                </div>

                {/* Academic stats */}
                <div>
                    <div className="card">
                        <h3>Статистика по курсам</h3>
                        <div>
                            <div>
                                <div>
                                    <span>📚</span>
                                    <span>Записанные курсы</span>
                                </div>
                                <p>69</p>
                            </div>

                            <div>
                                <div>
                                    <span>🏆</span>
                                    <span>Current GPA</span>
                                </div>
                                <p>4.26769</p>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <h3>Последние оценки</h3>
                        <div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}