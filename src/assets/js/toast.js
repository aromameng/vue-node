// toast.js
export default {
    install: function(Vue, duration = 1000, options) {
      Vue.prototype.$toast = function(text = "默认的提示信息", options = {type: 'error'}) {
        let bgColor  = 'rgba(0,0,0,.8)'
        let iconType = 'fa-exclamation-circle'
        if(options.type === 'success') {
          iconType = 'fa-check'
          bgColor  = '#51a351'
        }
        const styleForOuter = 'position: fixed;display: flex;top: 0;left: 0;' +
          'width: 100%;height: 100%;justify-content: center;align-items: center;z-index: 9999'
        const styleForInner = `background: ${bgColor}; max-width: 250px; display: flex; padding: 15px; position: relative; overflow: hidden; border-radius: 5px; opacity: 1; transition: opacity .5s linear`
        const htmlForInner = `
            <div style="flex: 1; color: #ffffff">${text}</div>
              `
        let outerDiv = document.createElement('div')
        outerDiv.style = styleForOuter
        let innerDiv = document.createElement('div')
        innerDiv.style = styleForInner
        innerDiv.innerHTML = htmlForInner
        outerDiv.appendChild(innerDiv)
        this.$root.$el.appendChild(outerDiv)
  
        // toast停留时间 500ms为opacity动画时间
        setTimeout(() => {innerDiv.style.opacity = 0}, duration)
        setTimeout(() => {this.$root.$el.removeChild(outerDiv)}, duration+500)
      }
    }
  }
  