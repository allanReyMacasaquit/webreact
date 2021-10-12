import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

interface Spinner {
    inverted?: boolean
    content?: string
}

const Loading = ({inverted = true, content = 'Loading...'}: Spinner) => {
    return (
        <div>
            <Dimmer active={true} inverted={inverted}>
                <Loader content={content}/>
            </Dimmer>
        </div>
    )
}

export default Loading
