import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getPaper } from '../../actions/papers'
export class DetailPaper extends Component {

    static propTypes = {
        user: PropTypes.object.isRequired,
        paper: PropTypes.object.isRequired,
        getPaper: PropTypes.func.isRequired,
    }


    componentDidMount() {
        this.props.getPaper(this.props.match.params.id)

    }

    render() {
        // const paper = (this.props.paper)? this.props.paper:{}
        return (
            <div className="container">
                <div className="card card-body my-4 mx-auto" style={{ maxWidth: '800px' }}>
                    <h3>{this.props.paper.title}</h3>
                    <hr className="my-2" />

                    {/* {
            Object.keys(this.props.paper).map((key, i) => {
                (this.props.paper[key] !=null || this.props.paper[key] !="" )?(
             <p key={i}>
             <span>Key Name: {key}</span>
             <span>Value: {this.props.paper[key]}</span>
             </p>):""
            })
            } */}
                    <div className="card card-body mt-4 mb-3" >
                        <div className="table-responsive">
                            <table className="table table-light table-hover table-striped">
                                <tbody>
                                    {(this.props.paper.author) ? (<tr>
                                        <td>Authors</td>
                                        <td>{this.props.paper.author.profile.full_name}
                                            {(this.props.paper.authors !== "") ? " and " + this.props.paper.authors : ""}</td>
                                    </tr>) : ""}
                                    <tr>
                                        <td>Publication Date</td>
                                        <td>{this.props.paper.publication_date}</td>
                                    </tr>
                                    <tr>
                                        <td>Publisher</td>
                                        <td>{this.props.paper.publisher}</td>
                                    </tr>
                                    {(this.props.paper.conference_name) ? <tr>
                                        <td>Conference</td>
                                        <td>{this.props.paper.conference_name + ", " + this.props.paper.location}</td>
                                    </tr> : ""}

                                    {(this.props.paper.journal) ? <tr>
                                        <td>Journal</td>
                                        <td>{this.props.paper.journal}</td>
                                    </tr> : ""}
                                    {(this.props.paper.SJR_rating) ? <tr>
                                        <td>Scientific Research Ranking Index</td>
                                        <td>{this.props.paper.SJR_rating}</td>
                                    </tr> : ""}
                                    {(this.props.paper.impact_factor_journal) ? <tr>
                                        <td>Impact Factor Journal Index</td>
                                        <td>{this.props.paper.impact_factor_journal}</td>
                                    </tr> : ""}
                                    {(this.props.paper.description) ? <tr>
                                        <td>Description</td>
                                        <td>{this.props.paper.description}</td>
                                    </tr> : ""}
                                    {(this.props.paper.volume) ? <tr>
                                        <td>Volume</td>
                                        <td>{this.props.paper.volume}</td>
                                    </tr> : ""}
                                    {(this.props.paper.pages) ? <tr>
                                        <td>Pages</td>
                                        <td>{this.props.paper.pages}</td>
                                    </tr> : ""}
                                    {(this.props.paper.issue) ? <tr>
                                        <td>Issue</td>
                                        <td>{this.props.paper.issue}</td>
                                    </tr> : ""}
                                    {(this.props.paper.issn) ? <tr>
                                        <td>ISSN</td>
                                        <td>{this.props.paper.issn}</td>
                                    </tr> : ""}
                                    {(this.props.paper.isbn) ? <tr>
                                        <td>ISBN</td>
                                        <td>{this.props.paper.isbn}</td>
                                    </tr> : ""}
                                    {(this.props.paper.edition) ? <tr>
                                        <td>Edition</td>
                                        <td>{this.props.paper.edition}</td>
                                    </tr> : ""}
                                    {(this.props.paper.chapters) ? <tr>
                                        <td>Chapters</td>
                                        <td>{this.props.paper.chapters}</td>
                                    </tr> : ""}
                                    {(this.props.paper.DOI) ? <tr>
                                        <td>DOI</td>
                                        <td>{this.props.paper.DOI}</td>
                                    </tr> : ""}
                                    {(this.props.paper.peer_reviewed) ? <tr>
                                        <td>Peer Reviewed</td>
                                        <td>{this.props.paper.peer_reviewed}</td>
                                    </tr> : ""}
                                    <tr>
                                        <td>MLA</td>
                                        <td>
                                            {(this.props.paper.author) ? this.props.paper.author.profile.full_name.split(" ").reverse().join(", ") : ""}
                                            {this.props.paper.authors ? ((this.props.paper.authors.split("and").length < 3) ? " and " + this.props.paper.authors : (this.props.paper.authors !== "") ? ", et al." : "") : ""}{" "}
                                            "{this.props.paper.title}."{" "} <span className="fst-italic">
                                                {(this.props.paper.conference_name) ? this.props.paper.conference_name + "." : ""}</span>{" "}
                                            <span className="fst-italic">
                                                {(this.props.paper.journal) ? this.props.paper.journal + "." : ""}</span>{" "}
                                            {this.props.paper.publisher}{", "}{this.props.paper.location}{" "}
                                            {this.props.paper.publication_date ? this.props.paper.publication_date.split("-")[0] : ""}
                                        </td>
                                    </tr>
                                    {(this.props.paper.paper_link) ? <tr>
                                        <td>Paper's Link</td>
                                        <td>{(this.props.paper.paper_link) ? <a href={this.props.paper.paper_link}>{this.props.paper.paper_link}</a> : ""}</td>
                                    </tr> : ""}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    paper: state.papers.paper
})

export default connect(mapStateToProps, { getPaper })(DetailPaper);
