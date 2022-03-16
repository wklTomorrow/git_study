const routerObserve = []

export const RouterHooks = {
    beforeRouterComponentLoad: function(cd) {
        routerObserve.push({
            type: 'before',
            cd
        })
    },
    afterRouterComonentDidLoader: function(cd) {
        routerObserve.push({
            type: 'after',
            cd
        })
    }
}

export default function asyncRouter(loadRouter) {
    return class Content extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                Component: null
            }
            this.dispatchRouterQueue('before')
        }
        dispatchRouterQueue(type) {
            const {history} = this.props;
            routerObserve.forEach(item => {
                if (item.type === type) {
                    item.cd && item.cd(history)
                }
            })
        }

        componentDidMount() {
            loadRouter()
                .then(module => module.default)
                .then(Component => this.setState({
                    Component
                }, () => {
                    this.dispatchRouterQueue('after')
                }))
        }

        render() {
            const {Component} = this.state;
            return Component ? <Component {...this.props}/> : null
        }
    }
}
