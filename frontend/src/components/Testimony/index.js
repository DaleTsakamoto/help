import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './Testimony.css';
import * as TestimonyActions from '../../store/testimony'


const Testimony = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.session.user)
  const user = useSelector(state => state.users.person)
  const currentTestimony = useSelector(state => state.testimony.testimony)
  const [isLoaded, setIsLoaded] = useState(false);
  const [comment, setComment] = useState('')
  const userId = user.id;
  const commenterId = currentUser.id;



  // const tabHide = (e) => {
  //   const ele = document.querySelector('.show');
  //   ele.classList.remove('show')
  //   e.target.parentElement.classList.add('show')
  //   setTaskChange(e.target)
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(TestimonyActions.testimonyAdd({ userId, commenterId, comment }))
    .then(() => setComment(''))
    return
  };

  // const alterTask = (e) => {
  //   let taskId = e.target.id
  //   let userId = currentUser.id;
  //   let name;
  //   if (e.target.name) {
  //     name = e.target.name
  //   } else {
  //     name = null
  //   }
  //   dispatch(TaskActions.taskUpdate({ taskId, urlId, name, userId })).then(setTaskId(taskId))
  //   return;
  // };

  useEffect(() => {
    dispatch(TestimonyActions.testimonySearch({
      userId
    })).then(() => setIsLoaded(true))
  }, [dispatch, setComment, comment]);

  let comments;
  if (isLoaded) {
    comments = Object.values(currentTestimony).map((testimony, idx) => {
      return (
        <div className='testimony-individual-container' key={idx}>
          <div className='testimony-individual-header'>
            <h1>{testimony.commenterId} </h1>
            <div>
              <i class="fas fa-edit"></i>
              <i class="fas fa-minus-square"></i>
            </div>
          </div>
          <p className='testimony-individual-body'>{testimony.comment}</p>
        </div>
      )
    })
  }

  return (
    <div className='testimony-container'>
      <h1 className='testimony-header__name'>Testimony</h1>
      {currentUser.id !== user.id ?
        <div className='testimony-form'>
          <form onSubmit={handleSubmit}>
            <div>
              <label className='testimony-type-choice' htmlFor="testify">Testify</label>
              <i onClick={ handleSubmit }className="fas fa-share-square"></i>
            </div>
              {user.helpType ? 
                <textarea id='textarea-submit' className='testimony-testify-text'
                value={comment}
                name= 'testify'
                onChange={e => setComment(e.target.value)}
                required
                  placeholder={`${user.firstName} is an amazing help because...`} />
                :
                <textarea id='textarea-submit' className='testimony-testify-text'
                value={comment}
                name= 'testify'
                onChange={e => setComment(e.target.value)}
                required
                placeholder={`I loved helping ${user.firstName} because...`} />
            }
          </form>
        </div> : null}
      <div className='testimony-comments-holder'>{ comments }</div>
    </div>
  )
}

export default Testimony;