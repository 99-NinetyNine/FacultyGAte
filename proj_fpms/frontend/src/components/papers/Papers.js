import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { getPapers, deletePapers, putPapers } from '../../actions/papers'
import { getProfile } from '../../actions/profiles'


export class Papers extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    papers: PropTypes.array.isRequired,
    getPapers: PropTypes.func.isRequired,
    deletePapers: PropTypes.func.isRequired,
    putPapers: PropTypes.func.isRequired,
    getProfile: PropTypes.func.isRequired
  }


  state = {
    id: '',
    title: '',
    description: '',
    group: '',
    paper_link: '',
    publisher: '',
    publication_date: "",
    status: '',

    volume: '',
    peer_reviewed: '',
    issn: '',
    issue: '',
    pages: '',

    DOI: '',
    journal: '',
    edition: '',
    isbn: '',
    level: '',
    chapters: '',
    authors: '',
    author_status:'',
    SJR_rating:'',
    impact_factor_journal:'',

    conference_name: '',
    location: '',
    organised_date: null,
  }

  componentDidMount() {
    this.props.getPapers(this.props.id);
  }

  getUser = (id) => {
    this.props.getProfile(id)
  }

  edit = (paper) => {
    this.setState({
      id: paper.id,
      title: paper.title,
      description: paper.description,
      group: paper.group,
      paper_link: paper.paper_link,
      publisher: paper.publisher,
      publication_date: paper.publication_date,
      status: paper.status,

      volume: paper.volume,
      peer_reviewed: paper.peer_reviewed,
      issn: paper.issn,
      issue: paper.issue,
      pages: paper.pages,

      DOI: paper.DOI,
      journal: paper.journal,
      edition: paper.edition,
      isbn: paper.isbn,
      level: paper.level,
      chapters: paper.chapters,
      authors: paper.authors,
      author_status:paper.author_status,
      SJR_rating: paper.SJR_rating,
      impact_factor_journal:paper.impact_factor_journal,

      conference_name: paper.conference_name,
      location: paper.location,
      organised_date: paper.organised_date,

    })
  }
  onEditClose = (e) => {
    this.setState({
      id: '',
      title: '',
      publisher: '',
      volume: '',
      peer_reviewed: '',
      issn: '',
      issue: '',
      pages: '',
      paper_link: '',
      publication_date: '',
      status: '',
      group: '',
      description: '',
      DOI: '',
      journal: '',
      edition: '',
      isbn: '',
      level: '',
      chapters: '',
      authors: '',
      author_status:'',
      SJR_rating:'',
      impact_factor_journal:'',
      conference_name: '',
      location: '',
      organised_date: null,
    })
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { id, title, publisher, volume, peer_reviewed, issn, issue, pages, paper_link, publication_date, status, group, description, DOI, journal, edition, isbn, level, chapters, authors, author_status, SJR_rating, impact_factor_journal,conference_name, location, organised_date } = this.state
    const paper = { title, publisher, volume, peer_reviewed, issn, issue, pages, paper_link, publication_date, status, group, description, DOI, journal, edition, isbn, level, chapters, authors, author_status, SJR_rating, impact_factor_journal, conference_name, location, organised_date }
    this.props.putPapers(id, paper)
    console.log(paper)
    this.setState({
      id: '',
      title: '',
      publisher: '',
      volume: '',
      peer_reviewed: '',
      issn: '',
      issue: '',
      pages: '',
      paper_link: '',
      publication_date: '',
      status: '',
      group: '',
      description: '',
      DOI: '',
      journal: '',
      edition: '',
      isbn: '',
      level: '',
      chapters: '',
      authors: '',
      author_status:'',
      SJR_rating:'',
      impact_factor_journal:'',
      conference_name: '',
      location: '',
      organised_date: null,
      bibtext: ""

    })
  }



  render() {

    const { id, title, publisher, volume, peer_reviewed, issn, issue, pages, paper_link, publication_date, status, group, description, DOI, journal, edition, isbn, level, chapters, authors, author_status, SJR_rating, impact_factor_journal, conference_name, location, organised_date } = this.state
    return (
      <Fragment>
        <h2 className="mt-3">Publications</h2>
        <div className="table-responsive">
          <table className="table table-striped table-hover table-sm">
            <thead>
              <tr>
                <th>Date</th>
                <th>Papers</th>
                <th>Authors</th>
                {/* <th>Publishers</th>
                            <th>Class</th> */}
                <th />
              </tr>
            </thead>
            <tbody>
              {this.props.papers.map((paper) => (
                <tr key={paper.id}>
                  <td>{paper.publication_date}</td>
                  <td><Link to={"/paper/" + paper.id} className="">{paper.title}</Link></td>
                  <td><Link to={"/user/" + paper.author.id} onClick={() => this.getUser(paper.author.id)} className="">{(paper.author.profile) ? paper.author.profile.full_name : ""}</Link>
                    {(paper.authors !== "") ? " and " + paper.authors : ""}</td>
                  {/* <td >{paper.publisher}</td>
                                <td>{paper.group}</td> */}
                  {(this.props.id == this.props.user.id) ?
                    (<td><button type="button" className="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => this.edit(paper)}><i className="far fa-edit"></i></button></td>
                    ) : ""}

                  {(this.props.id == this.props.user.id) ?
                    (<td><button className="btn btn-danger btn-sm" onClick={this.props.deletePapers.bind(this, paper.id)}><i className="fas fa-trash-alt"></i></button></td>
                    ) : ""}
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel"><i className="far fa-edit">  Edit</i></h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={this.onEditClose}></button>
              </div>
              <div className="modal-body">

                <form onSubmit={this.onSubmit}>

                  <div className="form-group my-2">
                    <label>Group</label>
                    <select className="form-control"
                      onChange={this.onChange}
                      name="group"
                      value={group}>
                      <option value="journal">Journal Article</option>
                      <option value="publication">Publication</option>
                      <option value="report">Report</option>
                      <option value="conference_article">Conference Article</option>
                      <option value="book">Book</option>
                      <option value="misc_paper">Miscellaneous Papers</option>
                    </select>
                  </div>

                  <div className="form-group my-2">
                    <label>Title</label>
                    <input
                      className="form-control"
                      type="text"
                      name="title"
                      onChange={this.onChange}
                      value={title}
                    />
                  </div>

                  <div className="form-group my-2">
                    <label>Contribution Status</label>
                    <select className="form-control"
                      onChange={this.onChange}
                      name="author_status"
                      value={author_status}>
                      <option value="">---</option>
                      <option value="chief">Chief Author</option>
                      <option value="co-author">Co-author</option>
                      <option value="correspondence">Correspondence Author</option>
                    </select>
                  </div>

                  <div className="form-group my-2">
                    <label>Co-Authors</label>
                    <input
                      className="form-control"
                      type="text"
                      name="authors"
                      onChange={this.onChange}
                      value={authors}
                    />
                  </div>

                  <div className="form-group">
                    <label>Publisher</label>
                    <input
                      className="form-control"
                      type="text"
                      name="publisher"
                      onChange={this.onChange}
                      value={publisher}
                    />
                  </div>

                  <div className="form-group my-2">
                    <label>Description</label>
                    <textarea
                      className="form-control"
                      type="text"
                      name="description"
                      onChange={this.onChange}
                      value={description}
                    />
                  </div>

                  <div className="form-group my-2">
                    <label>Peer Reviewed</label>
                    <input
                      className="form-control"
                      type="text"
                      name="peer_reviewed"
                      onChange={this.onChange}
                      value={peer_reviewed}
                    />
                  </div>

                  <div className="form-group my-2">
                    <label>Volume</label>
                    <input
                      className="form-control"
                      type="text"
                      name="volume"
                      onChange={this.onChange}
                      value={volume}
                    />
                  </div>

                  <div className="form-group my-2">
                    <label>Journal</label>
                    <input
                      className="form-control"
                      type="text"
                      name="journal"
                      onChange={this.onChange}
                      value={journal}
                    />
                  </div>

                  <div className="form-group my-2">
                    <label>SJR Index</label>
                    <input
                      className="form-control"
                      type="text"
                      name="SJR_rating"
                      onChange={this.onChange}
                      value={SJR_rating}
                    />
                  </div>

                  <div className="form-group my-2">
                    <label>Journal Impact Factor</label>
                    <input
                      className="form-control"
                      type="text"
                      name="impact_factor_journal"
                      onChange={this.onChange}
                      value={impact_factor_journal}
                    />
                  </div>


                  <div className="form-group my-2">
                    <label>Issue</label>
                    <input
                      className="form-control"
                      type="text"
                      name="issue"
                      onChange={this.onChange}
                      value={issue}
                    />
                  </div>

                  <div className="form-group my-2">
                    <label>Pages</label>
                    <input
                      className="form-control"
                      type="text"
                      name="pages"
                      onChange={this.onChange}
                      value={pages}
                    />
                  </div>


                  <div className="form-group my-2">
                    <label>DOI</label>
                    <input
                      className="form-control"
                      type="text"
                      name="DOI"
                      onChange={this.onChange}
                      value={DOI}
                    />
                  </div>

                  <div className="form-group my-2">
                    <label>ISSN</label>
                    <input
                      className="form-control"
                      type="text"
                      name="issn"
                      onChange={this.onChange}
                      value={issn}
                    />
                  </div>

                  <div className="form-group my-2">
                    <label>Edition</label>
                    <input
                      className="form-control"
                      type="text"
                      name="edition"
                      onChange={this.onChange}
                      value={edition}
                    />
                  </div>
                  <div className="form-group my-2">
                    <label>ISBN</label>
                    <input
                      className="form-control"
                      type="text"
                      name="isbn"
                      onChange={this.onChange}
                      value={isbn}
                    />
                  </div>


                  <div className="form-group my-2">
                    <label>Chapters</label>
                    <input
                      className="form-control"
                      type="text"
                      name="chapters"
                      onChange={this.onChange}
                      value={chapters}
                    />
                  </div>




                  <div className="form-group my-2">
                    <label>Conference</label>
                    <input
                      className="form-control"
                      type="text"
                      name="conference_name"
                      onChange={this.onChange}
                      value={conference_name}
                    />
                  </div>

                  <div className="form-group my-2">
                    <label>Conference Organised On</label>
                    <input
                      className="form-control"
                      type="date"
                      name="organised_date"
                      onChange={this.onChange}
                      value={organised_date}
                    />
                  </div>

                  <div className="form-group my-2">
                    <label>Location</label>
                    <input
                      className="form-control"
                      type="text"
                      name="location"
                      onChange={this.onChange}
                      value={location}
                    />
                  </div>


                  <div className="form-group my-2">
                    <label>Paper's Link</label>
                    <input
                      className="form-control"
                      type="text"
                      name="paper_link"
                      onChange={this.onChange}
                      value={paper_link}
                    />
                  </div>

                  <div className="form-group">
                    <label>Publication Date</label>
                    <input
                      className="form-control"
                      type="date"
                      name="publication_date"
                      onChange={this.onChange}
                      value={publication_date}
                    />
                  </div>

                  <div className="form-group my-2">
                    <label>Level</label>
                    <select className="form-control"
                      onChange={this.onChange}
                      name="level"
                      value={level}>
                      <option value=''>---</option>
                      <option value="national">National</option>
                      <option value="international">International</option>
                    </select>
                  </div>

                  <div className="form-group my-2">
                    <label>Status</label>
                    <select className="form-control"
                      onChange={this.onChange}
                      name="status"
                      value={status}>
                      <option value=''>---</option>
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>

                  <div className="modal-footer">
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={this.onEditClose}>Close</button>
                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                  </div>

                </form>

              </div>
            </div>
          </div>
        </div>

      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  papers: state.papers.papers
})

export default connect(mapStateToProps, { getPapers, deletePapers, putPapers, getProfile })(Papers);

