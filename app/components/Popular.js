import React from 'react'
import propTypes from 'prop-types'
var api = require('../utils/api');
import Loading from './Loading';
//if there is just render method in component, functions are more useful, it called stateless function

function SelectLanguage(props) {
  var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
  return(
    <ul className="languages">
    {languages.map(function(lang){
      return(
      <li
          style = {lang === props.selectedLanguage ? {color:'#d0021b'} :null }
          onClick={ props.onSelect.bind(null, lang)} //ask this
          key={lang} > 
           {lang}
      </li> 
      )
    })}
  </ul>
  )
}

SelectLanguage.propTypes = {
  selectedLanguage: propTypes.string.isRequired,
  onSelect: propTypes.func.isRequired,
}
RepoGrid.propTypes ={
  repos : propTypes.array.isRequired
}


function RepoGrid(props) {
  return(
    <ul className= 'popular-list'>
        {props.repos.map(function(repo, index) {
          return( 
          <li key={repo.name} className="popular-item" >
              <div className="popular-rank" >#{index +1 }</div>
              <ul className="space-list-items" >
                <li>
                    <img
                      className='avatar'
                      src={repo.owner.avatar_url}
                      alt={"Avatar for "+ repo.owner.login}
                      />
                </li>
                <li> <a target='_blank' href={repo.html_url}>{repo.name}</a></li>
                <li>@{repo.owner.login}</li>
                <li>{repo.stargazers_count} stars</li>
              </ul>
          </li>
         )
        })}
    </ul>
  )
}



class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage:"All",
      repos:null
    };
    
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount(){
    //AJAX requests
    this.updateLanguage(this.state.selectedLanguage);
    
  }

  updateLanguage(lang) {
    this.setState(function () {  
      return{   
        selectedLanguage: lang,
        repos: null
      }   
    })
    api.fetchPopularRepos(lang)
      .then(function(repos){
        this.setState(function(){
            return{
              repos: repos
            }
        })
      }.bind(this));
  } 

  render () {

    return (
        <div>
            <SelectLanguage
              selectedLanguage={this.state.selectedLanguage}
              onSelect = {this.updateLanguage}
            />
            {!this.state.repos ?  <Loading /> : 
          <RepoGrid repos={this.state.repos} />
          }
        </div>
    )
  }
}

module.exports = Popular;
