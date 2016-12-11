import React, {Component} from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router'; 
import { fetchPosts } from '../actions';

class PostsIndex extends Component {
    componentDidMount(){
        this.props.fetchPosts();
    }
    
    render () {
        const posts = this.props.posts;
        const noItemsInfo = `You have no any post items yet. Click Add Post to add your 1st post.`;
        return (
            <div className="posts-index">
                <div className="text-right">
                    <Link to="/posts/new" className="btn btn-primary">Add Post</Link>
                </div>
                <div className="posts-index-list-container">
                    {posts.length > 0 ? 
                        <ul className="list-group"> {posts.map(post => this.renderPostItem(post))}</ul> : 
                        <span className="alert alert-info">{noItemsInfo}</span> }                                         
                </div>
            </div>
        )
    }

    renderPostItem(post){
        return (
            <Link className="posts-list-item list-group-item" to={`/posts/${post.id}`} key={post.id}>
                <span>{post.title}</span>
                <span className="badge">{post.categories}</span>
            </Link>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        posts: state.posts.all
    }
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
