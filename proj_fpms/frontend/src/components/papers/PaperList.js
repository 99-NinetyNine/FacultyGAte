import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';



export class PaperList extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        papers: PropTypes.array.isRequired,
    }

    //  componentDidMount(){
    //     this.props.getPapers(this.props.user.id);
    //  }


    state = {
        group: '',
        level: '',
        impact_factor: '',
        format: ''

    }


    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    handleClick = () => {
        print()
    }

    exportToCSV = (csvData, fileName) => {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
        const fileExtension = '.xlsx'
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + '_' + this.state.group + fileExtension);
    }

    mlaNaming = (authors, author_name) => { //receive paper.authors


        // {author}{(paper.authors !== "") ? ((paper.authors.split("and").length <= 3) ? " and " + paper.authors : ", et al.") : ""}{" "}
        //expanding this for more control

        let name = "";

        name = name + author_name;

        if (authors != "") {
            let temp = authors.split(" and ");
            if (temp.length <= 3) {
                if (temp.length === 2) {
                    name = name + " and " + temp[1].split(",").reverse().join(" ") + ".";
                }
                else if (temp.length === 3) {
                    // alert(temp[1]);
                    name = name + ", " + temp[1].split(",").reverse().join(" ") + ", and " + temp[2].split(",").reverse().join(" ") + ".";
                }
            }
            else {
                name = name + ", et al.";
            }
        }
        return name;
    }
    initials = (name, f) => {

        let temp = name.split(",").reverse(); //firstname middlename lastname array

        if (f === 'ugc') {
            return temp.join(" ");
        }

        if (f === 'apa') {

            if (temp.length == 3) {
                return (temp[2] + ", " + temp[0][1] + "." + temp[1][1]); //lastname, and initials of first and middle name
            }

            if (temp.length == 2) {
                return (temp[1] + ", " + temp[0][1]);
            }

            if (temp.length == 1) {
                return (temp[0]);
            }

        }

        if (f === 'ieee') {


            if (temp.length == 3) //with middle name
            {
                return (temp[0][1] + "." + temp[1][1] + ". " + temp[2]);
            }
            else if (temp.length == 2) {
                // alert(temp[0][1]);
                return (temp[0][1] + ". " + temp[1]);
            }

            else if (temp.length == 1) {
                return temp[0];
            }

        }

    }
    //return apaNaming
    apaNaming = (authors, author_name) => {

        /* {author}{(paper.authors !== "") ? ((paper.authors.split("and").length <= 3) ? " and " + paper.authors : ", et al.") : ""}{" "}  */

        let name = "";

        name = name + this.initials(author_name, 'apa');

        if (authors != "") {
            let temp = authors.split(" and ");
            if (temp.length <= 3) {
                if (temp.length === 2) {
                    name = name + " & " + this.initials(temp[1], 'apa') + ". ";
                }
                else if (temp.length === 3) {
                    // alert(temp[1]);
                    name = name + ", " + this.initials(temp[1], 'apa') + ". " + " & " + this.initials(temp[2], 'apa') + ". ";
                }
            }
            else {
                name = name + ", et al.";
            }
        }
        return name;
    }
    //return IEEEnaming
    IEEEnaming = (authors, author_name) => {

        /* {author}{(paper.authors !== "") ? ((paper.authors.split("and").length < 3) ? " and " + paper.authors : ", et al.") : ""}{" "}  */

        //6 authors should be shown but ...
        let name = "";
        let form = 'ieee';
        let conjunction = ", "

        name = name + this.initials(author_name, form);

        if (authors != "") {
            let temp = authors.split(" and ");

            if (temp.length <= 6) {
                for (let i in temp) {
                    if (i == temp.length - 1) {
                        conjunction = ", and ";
                    }

                    name = name + conjunction + this.initials(temp[i], form);
                }
            }

            else {
                name = name + ", et al.";
            }
        }
        return name + " ";

    }

    UGCnaming = (authors, author_name) => {
        let name = "";
        name = name + this.initials(author_name, 'ugc');
        if (authors != "") {
            let temp = authors.split(" and ");
            for (let i in temp) {
                name = name + ", " + this.initials(temp[i], 'ugc');
            }
        }
        return name;
    }






    render() {
        const { group, level, impact_factor, format } = this.state

        let displayPapers = this.props.papers
        if (group !== "") { displayPapers = displayPapers.filter(paper => paper.group == group) }
        if (level !== "") { displayPapers = displayPapers.filter(paper => paper.level == level) }

        if (impact_factor == "impact_factor" && group == "journal") { displayPapers = displayPapers.filter(paper => paper.impact_factor_journal != null).sort((a, b) => (a.impact_factor_journal < b.impact_factor_journal ? 1 : -1)) }
        else if (impact_factor == "SJR" && group == "journal") { displayPapers = displayPapers.filter(paper => paper.SJR_rating != null).sort((a, b) => (a.SJR_rating < b.SJR_rating ? 1 : -1)) }
        else if (impact_factor == "peer_reviewed") { displayPapers = displayPapers.filter(paper => paper.peer_reviewed != '') }

        const author_name = this.props.user.profile.full_name.split(" ").reverse().join(", ")

        const papers = displayPapers.map(paper => {
            return {
                ...paper,
                author: this.props.user.profile.full_name,
                authors: this.UGCnaming(paper.authors, author_name)
            }
        })


        let UGCpapers = papers.map((paper) => {
            let UGCpaper = {
                Title: paper.title,
                Authors: paper.authors,
                Contribution_Status: paper.author_status,
                Publication_Date: paper.publication_date,
                Publisher: paper.publisher + ". " + paper.location,
                Conference_Name: paper.conference_name + ". " + paper.location,
                Journal_Name: paper.journal,
                Paper_link: paper.paper_link
            }

            if (group !== "journal" && group !== "") { delete UGCpaper.Journal_Name }
            if (group !== "conference_article" && group !== "") { delete UGCpaper.Conference_Name }
            if (group == "report") { delete UGCpaper.Contribution_Status }

            return UGCpaper
        })


        let group_text = ''
        if (group == "journal") group_text = 'Journal Articles'
        if (group == "conference_article") group_text = "Conference Articles"
        if (group == "report") group_text = "Scientific Reports"
        if (group == "publication") group_text = "Publications"
        if (group == "book") group_text = "Books "
        if (group == "misc_papers") group_text = "Miscellaneous Articles"




        return (
            <Fragment>

                <h4 className="mt-3">Publications & Appearances</h4>
                <div className="text-right" style={{ textAlign: "right" }}>
                    <button className="btn btn-danger ms-auto mx-2 d-print-none" onClick={this.handleClick}>
                        <i className="far fa-file-pdf"></i>
                    </button>

                    <button className="btn btn-success ms-auto d-print-none mx-2" onClick={(e) => (format == "UGC") ? this.exportToCSV(UGCpapers, this.props.user.username) : this.exportToCSV(papers, this.props.user.username)}>
                        <i className="far fa-file-excel"></i>
                    </button>
                </div>


                <div className="form d-print-none">
                    <div className="row">

                        <div className="col-md-3">
                            <label>Format</label>
                            <select className="form-select"
                                onChange={this.onChange}
                                name="format"
                                value={format}>
                                <option value=''>---</option>
                                <option value="MLA">MLA</option>
                                <option value="APA">APA</option>
                                <option value="UGC">UGC/TU</option>
                                <option value="IEEE">IEEE</option>
                            </select>
                        </div>

                        <div className="col-md-3">
                            <label>Group</label>
                            <select className="form-select"
                                onChange={this.onChange}
                                name="group"
                                value={group}>
                                <option value=''>---</option>
                                <option value="journal">Journal Article</option>
                                <option value="publication">Publication</option>
                                <option value="report">Report</option>
                                <option value="conference_article">Conference Article</option>
                                <option value="book">Book</option>
                                <option value="misc_paper">Miscellaneous Papers</option>
                            </select>
                        </div>

                        <div className="col-md-3">
                            <label>Level</label>
                            <select className="form-select"
                                onChange={this.onChange}
                                name="level"
                                value={level}>
                                <option value=''>---</option>
                                <option value="national">National</option>
                                <option value="international">International</option>
                            </select>
                        </div>


                        <div className="col-md-3">
                            <label>Advanced Sort</label>
                            <select className="form-select"
                                onChange={this.onChange}
                                name="impact_factor"
                                value={impact_factor}>
                                <option value=''>---</option>
                                <option value='peer_reviewed'>Peer Reviewed</option>
                                {(this.state.group == "journal") ? <option value="SJR">SJR Index</option> : ''}
                                {(this.state.group == "journal") ? <option value="impact_factor">Impact Factor</option> : ''}
                            </select>
                        </div>


                    </div>
                </div>


                <p className="fw-light my-3">{this.props.user.profile.full_name}</p>


                <div className="table-responsive">
                    <p className="fw-lighter d-none d-print-block">{group_text}</p>

                    {/*---------------MLA-------------*/}

                    {this.state.format == 'MLA' ?
                        <table className="table table-borderless">
                            <tbody>
                                {displayPapers.map((paper) => (
                                    <tr key={paper.id}>
                                        <td>
                                            {this.mlaNaming(paper.authors, author_name)}
                                            "{paper.title}".{" "} <span className="fst-italic">{(paper.conference_name) ? paper.conference_name + "." : ""}</span>{" "}
                                            <span className="fst-italic">{(paper.journal) ? paper.journal + "." : ""}</span>{" "}
                                            {paper.publisher}{", "}{paper.location}{" "}{paper.publication_date.split("-")[0]}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        : null}


                    {/* ------------------APA------------- */}

                    {this.state.format == 'APA' ?
                        <table className="table table-borderless">
                            <tbody>
                                {displayPapers.map((paper) => (
                                    <tr key={paper.id}>
                                        <td>
                                            {this.apaNaming(paper.authors, author_name)}
                                            {paper.publication_date.split("-")[0]}.
                                            "{paper.title}".{" "} <span className="fst-italic">{(paper.conference_name) ? paper.conference_name + "." : ""}</span>{" "}
                                            <span className="fst-italic">{(paper.journal) ? paper.journal + "." : ""}</span>{" "}
                                            {paper.location}{" "}
                                            {paper.publisher}
                                        </td>

                                    </tr>
                                ))}
                            </tbody> </table>
                        : null}



                    {/* IEEE Citation */}
                    {this.state.format == 'IEEE' ?
                        <table className="table table-borderless">
                            <tbody>
                                {displayPapers.map((paper) => (
                                    <tr key={paper.id}>
                                        <td>
                                            {this.IEEEnaming(paper.authors, author_name)}
                                            "{paper.title}".{" "} <span className="fst-italic">{(paper.conference_name) ? paper.conference_name + "." : ""}</span>{" "}
                                            <span className="fst-italic">{(paper.journal) ? paper.journal + "." : ""}</span>{" "}
                                            {paper.location}{" "}
                                            {paper.publisher}
                                            {paper.publication_date.split("-")[0]}.
                                        </td>

                                    </tr>
                                ))}
                            </tbody> </table>
                        : null}




                    {/*--------------UGC/TU---------------------*/}
                    {this.state.format == 'UGC' ?
                        <table className="table table-bordered table-responsive">
                            <thead>
                                <tr>
                                    <td><strong>Title</strong></td>
                                    <td><strong>Authors</strong></td>
                                    <td><strong>Author Status</strong></td>
                                    <td><strong>Date</strong></td>
                                    <td><strong>Publisher</strong></td>
                                    {group == 'conference_article' || group == '' ? <td><strong>Conference</strong></td> : ''}
                                    {group == 'journal' || group == '' ? <td><strong>Journal</strong></td> : ''}
                                    <td><strong>Link</strong></td>
                                </tr>
                            </thead>

                            <tbody>
                                {displayPapers.map((paper) => (

                                    <tr key={paper.id}>
                                        <td id="Title">
                                            {paper.title}
                                        </td>

                                        <td id="Authors">
                                            {this.UGCnaming(paper.authors, author_name)}
                                        </td>

                                        <td id="Contribution_Status">
                                            {paper.author_status}
                                        </td>

                                        <td id="Publication_Date">
                                            {paper.publication_date}
                                        </td>

                                        <td id="Publisher">
                                            {paper.publisher}
                                        </td>

                                        {group == 'conference_article' || group == '' ? <td id="Conference_Name">
                                            {paper.conference_name}
                                        </td> : ''}

                                        {group == 'journal' || group == '' ? <td id="Journal_Name">
                                            {paper.journal}
                                        </td> : ''}

                                        <td id="Paper_Link">
                                            {paper.paper_link}
                                        </td>

                                    </tr>
                                ))}

                            </tbody>
                        </table>
                        : null}





                </div>

            </Fragment>
        )

    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    papers: state.papers.papers
})

export default connect(mapStateToProps, {})(PaperList);