import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addPapers } from '../../actions/papers';
import bibtexParse from '@orcid/bibtex-parse-js'

export class PaperForm extends Component {

  static propTypes = {
    addPapers: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired

  }

  state = {
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
    author_status: '',
    impact_factor_journal: '',
    SJR_rating: '',

    conference_name: '',
    location: '',
    organised_date: null,

    isBibtex: 'Import from BibTex',
    bibtext: '',

  }


  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onBibtex = (e) => {
    this.setState({
      isBibtex: ''
    })
  }

  handleFileChosen = (file) =>{
   
    let fileReader = new FileReader()
    fileReader.onloadend = (e) =>{
      const content = fileReader.result;
      this.setState({
        bibtext: content
      })
    }
    fileReader.readAsText(file);

  }

  onSubmitBibtex = (e) => {
    e.preventDefault();

    const sample = bibtexParse.toJSON(this.state.bibtext);
    console.log(sample)

    this.setState({
      title: '',
      publisher: '',
      volume: '',
      peer_reviewed: '',
      issn: '',
      issue: '',
      pages: '',
      paper_link: '',
      publication_date: '',
      description: '',
      DOI: '',
      journal: '',
      edition: '',
      isbn: '',
      level: '',
      chapters: '',
      authors: '',
      author_status: '',
      SJR_rating: '',
      impact_factor_journal: '',
      group: '',
      status: '',

      conference_name: '',
      location: '',
      organised_date: null,
      bibtext: ""

    })



    let { title, publisher, volume, peer_reviewed, issn, issue, pages, paper_link, publication_date, status, group, description, DOI, journal, edition, isbn, level, chapters, authors, author_status, SJR_rating, impact_factor_journal, conference_name, location, organised_date } = this.state
    if (sample.length > 1) {

      for (let i = 0; i < sample.length; i++) {

        console.log(sample[i].entryTags)
        const year = sample[i].entryTags.year + "-01-01"

        const name = this.props.user.profile.full_name.split(" ").reverse().join(", ");
        const coauthors = sample[i].entryTags.author.split(" and ");
        if (coauthors.includes(name)) {
          let index = coauthors.indexOf(name);
          coauthors.splice(index, 1)
        }

        coauthors = coauthors.join(" and ")


        group = "misc_paper"
        if (sample[i].entryType == "inproceedings" || sample[i].entryType == "conference" || sample[i].entryType == "proceedings") { group = "conference_article" }
        if (sample[i].entryType == "article") { group = "journal" }

        title = sample[i].entryTags.title
        authors = coauthors
        publisher = sample[i].entryTags.publisher ? sample[i].entryTags.publisher : (sample[i].entryTags.organization ? sample[i].entryTags.organization : "")
        conference_name = sample[i].entryTags.booktitle ? sample[i].entryTags.booktitle : ""
        volume = sample[i].entryTags.volume ? sample[i].entryTags.volume : ""
        journal = sample[i].entryTags.journal
        publication_date = year
        pages = sample[i].entryTags.pages ? sample[i].entryTags.pages : ""
        status = "published"


        const paper = { title, publisher, volume, peer_reviewed, issn, issue, pages, paper_link, publication_date, status, group, description, DOI, journal, edition, isbn, level, chapters, authors, author_status, SJR_rating, impact_factor_journal, conference_name, location, organised_date }
        this.props.addPapers(paper)

      }
      this.setState({
        bibtext: ""
      })

    }

    else {
      const year = sample[0].entryTags.year + "-01-01"

      const name = this.props.user.profile.full_name.split(" ").reverse().join(", ");
      let coauthors = sample[0].entryTags.author.split(" and ");
      if (coauthors.includes(name)) {
        let index = coauthors.indexOf(name);
        coauthors.splice(index, 1)
      }

      coauthors = coauthors.join(" and ")


      this.setState({
        title: sample[0].entryTags.title,
        authors: coauthors,
        publisher: sample[0].entryTags.publisher ? sample[0].entryTags.publisher : (sample[0].entryTags.organization ? sample[0].entryTags.organization : ""),
        conference_name: sample[0].entryTags.booktitle ? sample[0].entryTags.booktitle : "",
        volume: sample[0].entryTags.volume ? sample[0].entryTags.volume : "",
        journal: sample[0].entryTags.journal,
        publication_date: year,
        pages: sample[0].entryTags.pages ? sample[0].entryTags.pages : ""

      })
    }

  }

  onSubmit = (e) => {
    e.preventDefault();
    const { title, publisher, volume, peer_reviewed, issn, issue, pages, paper_link, publication_date, status, group, description, DOI, journal, edition, isbn, level, chapters, authors, author_status, SJR_rating, impact_factor_journal, conference_name, location, organised_date } = this.state
    const paper = { title, publisher, volume, peer_reviewed, issn, issue, pages, paper_link, publication_date, status, group, description, DOI, journal, edition, isbn, level, chapters, authors, author_status, SJR_rating, impact_factor_journal, conference_name, location, organised_date }
    this.props.addPapers(paper)
    console.log(paper)
    this.setState({
      title: '',
      publisher: '',
      volume: '',
      peer_reviewed: '',
      issn: '',
      issue: '',
      pages: '',
      paper_link: '',
      publication_date: '',
      description: '',
      DOI: '',
      journal: '',
      edition: '',
      isbn: '',
      level: '',
      chapters: '',
      authors: '',
      author_status: '',
      SJR_rating: '',
      impact_factor_journal: '',
      group: '',
      status: '',

      conference_name: '',
      location: '',
      organised_date: null,
      bibtext: ""

    })
  }

  render() {

    const { title, publisher, volume, peer_reviewed, issn, issue, pages, paper_link, publication_date, status, group, description, DOI, journal, edition, isbn, chapters, authors, author_status, SJR_rating, impact_factor_journal, conference_name, location, organised_date, level } = this.state
    return (
      <div className="card card-body my-5 ">

        {(this.state.isBibtex == '') ? (<div className="container">
          <h3>Import from BibTex</h3>
          <form className='my-3' onSubmit={this.onSubmitBibtex}>

            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">Upload your BibTex file.</label>
              <input className="form-control" type="file" id="formFile" accept=".bib"  onChange={e => this.handleFileChosen(e.target.files[0])}/>

            </div>

            <div className="form-group my-2">
              <label> OR Copy your BibTex here.</label>
              <textarea
                className="form-control"
                type="text"
                name="bibtext"
                placeholder=""
                onChange={this.onChange}
                value={this.state.bibtext}
              />
            </div>

            <div className="form-group my-2">
              <button type="submit" className="btn btn-primary">
                Import
              </button>
            </div>
          </form>


        </div>) : (<div className="text-right" style={{ textAlign: "right" }}>
          <button type="button" onClick={this.onBibtex} className="btn btn-primary float-right"> {this.state.isBibtex}</button>
        </div>)}



        <h2 className="my-4">Add Papers</h2>
        <form onSubmit={this.onSubmit}>



          <div className="form-group my-2">
            <label>Group</label>
            <select className="form-control"
              onChange={this.onChange}
              name="group"
              value={group}>
              <option value="">---</option>
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
              placeholder="lastname1, firstname1 and lastname2, firstname2 and..."
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

          {(group == "journal" || group == "book") ? (
            <div className="form-group my-2">
              <label>Volume</label>
              <input
                className="form-control"
                type="text"
                name="volume"
                onChange={this.onChange}
                value={volume}
              />
            </div>) : ""}

          {(group == "journal") ? (<>
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
            </div></>


          ) : ""}



          {(group == "journal" || group == "conference_article") ? (
            <><div className="form-group my-2">
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
              </div> </>) : ""}


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

          {(group == "book") ? (<>
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

          </>) : ""
          }

          {(group == "conference_article") ? (
            <>

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
            </>) : ""}

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
              <option value="">---</option>
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
              <option value="">---</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>


          <div className="form-group my-2">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  user: state.auth.user

})



export default connect(mapStateToProps, { addPapers })(PaperForm)
