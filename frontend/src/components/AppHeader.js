import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AppHeader extends Component {

  render() {
    return (
        <div className="col">
            <div className="row">
                <Link to="/" className="col black-font">
                    <h1 className="header-title col">מתוק לי</h1>
                </Link>

            </div>
            {this.props.pageSelected === 1 ?
                <p className="row description">
                אנו שמחים לארח אתכם באתר הרשמי של רשת מתוק לי המציע לכם ליהנות מהידע, והניסיון שצברנו במהלך השנים ולהיכנס לעולם העשיר והממכר של תרבות האפייה והקונדיטוריה.
                צוות הקונדיטורים והאופים עמלים מדיי יום על הכנת לחמים ומאפים ביתיים, קישים, שלל קינוחים ומגוון רחב של עוגות ועוגיות, בקפידה רבה, תוך שימוש בחומרי גלם משובחים ועם המון אהבה.
                </p>:""}

        </div>
    );
  }
}

export default AppHeader;
