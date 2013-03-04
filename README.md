NAME
====

jquery.bires


SYNOPSIS
========

bires.download();


DESCRIPTION
===========

multiplexing which images to send to which devices is a sticky problem.

some people use device detection (user-agents) to determine who wants big
images.  sometimes media queries/screen width is used as a proxy.  

both are poor choices.

these days one can easily desire hi-res images to be displayed using a retina
screened tablet on local wifi.  with 'normal' image enhancement approaches
some devices, with good connections and amazingly pixel density, will receive
low quality images.  

a tablet on a slow connection in landscape orientation might have a screen
with pushing some arbitrary (768px) threshold and be delivered massive images
designed for broadband connected desktop machines.

compounding the problem is that device and/or screen width enhancement can
easily result in sending a small image to a device with a high density display
that causes real layout issues: a 320px image might take up the full screen on
some iphones, while on others it will either occupy 1/2 the screen or become
streched to fill all 640 and look poorly.

what if, instead, we simply always tried to deliver the highest quality images
to all devices and provied lower quality ones if we determined that this was a
bad plan at runtime?  

the approach of jquery.bires is exactly this.

the content intially comes down with low quality images, making page load time
as fast as possible and giving the user the full content.  after all low
quality images are loaded jquery.bires begins replacing low quality images
with hi quality ones *serially*, timing the speed of each replacement.  if any
replacement seems to be taking too long enhancement simply stops.  because
jquery.bires loads the larger images one at the time the ui remains
responsive to user clicks and interactions.

the key here is that, with today's high density mobile displays, it's actually
*bandwith* and *not screen size* that should determine who gets hi quality
images.

this approach results in the fancy tablet on local wifi getting the best
possible experience while, at the same time, keeps pages viewed on a desktop
tethered through a 3G connect from killing a data plan and loading very
slowly.

best of all, instead of manging lists of user agents, guessing about various
breakpoints, etc - the code simply always uses the same strategy of trying
hard to make pages load fast and become as good as possible later.


refs:

* https://github.com/bjankord/Categorizr
* http://www.brettjankord.com/2013/01/10/active-development-on-categorizr-has-come-to-an-end/
* https://gist.github.com/paulirish/268257
* https://github.com/desandro/imagesloaded
* http://www.youtube.com/watch?v=Tj0lmwg27EY
* http://dojo4.com/blog/size-matters
* http://dojo4.com

note:

* jquery.bires *depends on* https://github.com/desandro/imagesloaded

