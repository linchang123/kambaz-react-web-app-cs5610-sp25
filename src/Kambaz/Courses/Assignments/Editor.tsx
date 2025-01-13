export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <label htmlFor="wd-name">Assignment Name</label>
        <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
        <textarea id="wd-description">
          The assignment is available online Submit a link to the landing page of
        </textarea>
        <br />
        <table>
            <tr>
                <td align="right" valign="top">
                    <label htmlFor="wd-points">Points</label>
                </td>
                <td>
                    <input id="wd-points" value={100} />
                </td>
            </tr>
            <tr>
                <td align="right" valign="top">
                    <label htmlFor="wd-group">Assignment Group</label>
                </td>
                <td>
                    <select id="wd-group">
                        <option value="QUIZZES">QUIZZES</option>
                        <option selected value="ASSIGNMENTS">ASSIGNMENTS</option>
                        <option value="EXAMS">EXAMS</option>
                        <option value="PROJECT">PROJECT</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td align="right" valign="top">
                    <label htmlFor="wd-display-grade-as">Display Grade as</label>
                </td>
                <td>
                    <select id="wd-display-grade-as">
                        <option value="No Selection">No Selection</option>
                        <option selected value="Percentage">Percentage</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td align="right" valign="top">
                    <label htmlFor="wd-submission-type">Submission Type</label>
                </td>
                <td>
                    <div>
                        <select id="wd-submission-type">
                            <option value="No Selection">No Selection</option>
                            <option selected value="Online">Online</option>
                        </select>
                    </div>
                    <div>
                        <label>Online Entry Options</label><br />

                        <input type="checkbox" name="checkbox-entry-options" id="wd-text-entry"/>
                        <label htmlFor="wd-text-entry">Text Entry</label><br />

                        <input type="checkbox" name="checkbox-entry-options" id="wd-website-url"/>
                        <label htmlFor="wd-website-url">Website URL</label><br />

                        <input type="checkbox" name="checkbox-entry-options" id="wd-media-recordings"/>
                        <label htmlFor="wd-media-recordings">Media Recordings</label><br />

                        <input type="checkbox" name="checkbox-entry-options" id="wd-student-annotation"/>
                        <label htmlFor="wd-student-annotation">Student Annotation</label><br />

                        <input type="checkbox" name="checkbox-entry-options" id="wd-file-upload"/>
                        <label htmlFor="wd-file-upload">File Uploads</label>
                    </div>
                </td>
            </tr>
            <tr>
                <td align="right" valign="top">
                    <label>Assign</label>
                </td>
                <td>
                    <div>
                        <label htmlFor="wd-assign-to">Assign to</label><br/>
                        <input id="wd-assign-to" value="Everyone" />
                    </div>
                    <div>
                        <label htmlFor="wd-due-date">Due</label><br/>
                        <input type="date" value="2024-05-13" id="wd-due-date"/><br/>
                    </div>
                    <AssignmentAvailability />
                </td>
            </tr>
            <tr>
                <td colSpan={2} align="right">
                    <hr/>
                    <button>Cancel</button>
                    <button>Save</button>
                </td>
            </tr>
        </table>
    </div>
);}

function AssignmentAvailability() {
    return (
        <table>
            <thead>
                <tr>
                    <th><label htmlFor="wd-available-from">Available From</label></th>
                    <th><label htmlFor="wd-available-until">Until</label></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                    <input type="date" value="2024-05-06" id="wd-available-from"/><br/>
                    </td>
                    <td>
                    <input type="date" value="2024-05-20" id="wd-available-until"/><br/>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}