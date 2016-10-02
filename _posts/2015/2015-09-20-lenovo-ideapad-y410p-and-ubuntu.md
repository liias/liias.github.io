---
title: Lenovo IdeaPad Y410p and Ubuntu 15.04
keywords: Nvidia graphics-drivers prime intel graphics installer for linux black screen
comments: true
uuid: ideapad_ubuntu
---
Hope it's useful to future me or anyone else.

## Conflicting Intel Graphics Installer for Linux and NVIDIA proprietary drivers

Installing these Intel drivers will cause your system to not start X up.
You can still install them, but then you need to do [this](http://askubuntu.com/a/540722/16494):

    sudo apt-get purge i915-4.0.4-3.19-dkms
    sudo apt-get install --reinstall xserver-xorg-video-intel libgl1-mesa-glx libgl1-mesa-dri xserver-xorg-core
    sudo dpkg-reconfigure xserver-xorg
    sudo apt-get install --reinstall nvidia-355
    sudo dpkg-reconfigure bbswitch-dkms
    sudo ldconfig -n
    sudo update-initramfs -u

    sudo prime-select nvidia
    sudo nvidia-xconfig

    sudo reboot

<!--more-->

And if for whatever reason Unity doesn't start up anymore, then Right click on desktop, choose Open Terminal and run

    dconf reset -f /org/compiz/
    setsid unity

If screen goes black now, switch to some other VT (e.g Ctrl+Alt+F2), login and sudo reboot


## Speaker doing pop noise when shutting down computer

Add to the end of `/etc/modprobe.d/alsa-base.conf`

    options snd-hda-intel model=,generic

(yes, with the comma)

Bug: <https://bugzilla.kernel.org/show_bug.cgi?id=71511>
