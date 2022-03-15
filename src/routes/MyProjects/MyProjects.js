import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Project from '../donate/Project'

const MyProjects = () => {
  return (
    <div>
      <ProjectList />
    </div>
  )
}
const ProjectList = () => {
  const location = useLocation()
  //const [projects, setProjects] = useState(location.state)
  const { state: projects } = useLocation()
  console.log(projects.length)

  return (
    <div className="donate-body">
      {projects && projects.length !== 0 ? (
        projects?.map((campaign) => <Project projectDetails={campaign} />)
      ) : (
        <h1>No Projects</h1>
      )}
    </div>
  )
}
export default MyProjects
