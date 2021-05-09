import React, { Component } from 'react';

class AppHeader extends Component {

    onSelectPage = ()=>{
        this.props.onSelectPage(1);
    }
  render() {
    return (
        <div className="col">
            <div className="row">
                <h1 className="header-title col" onClick={()=>this.onSelectPage()}>
                    מתוק לי
                </h1>
            </div>
            <p className="row description">
                אנו שמחים לארח אתכם באתר הרשמי של רשת מתוק לי המציע לכם ליהנות מהידע, והניסיון שצברנו במהלך השנים ולהיכנס לעולם העשיר והממכר של תרבות האפייה והקונדיטוריה.
                צוות הקונדיטורים והאופים עמלים מדיי יום על הכנת לחמים ומאפים ביתיים, קישים, שלל קינוחים ומגוון רחב של עוגות ועוגיות, בקפידה רבה, תוך שימוש בחומרי גלם משובחים ועם המון אהבה.
            </p>
        </div>
    );
  }
}

export default AppHeader;
