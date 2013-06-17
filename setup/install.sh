#!/usr/bash
# Here are the extra things I install on the bone
# --Mark
# 6-Jul-2012
ssh-copy-id root@bone2
ssh -X root@bone2
cd ~
echo yoder-bone > /etc/hostname

opkg update
opkg install openssh-keygen
git config --global user.name "Mark A. Yoder"
git config --global user.email Mark.A.Yoder@Rose-Hulman.edu
git clone git@github.com:MarkAYoder/BeagleBoard-exercises.git exercises
# git commit --amend --reset-author
cp exercises/.bashrc .
ln -s /var/lib/cloud9 .
cd exercises/pinMux
ln -s $PWD/pinMux.html /var/lib/cloud9/bone101
cd cloud9
git pull
cd

mount /dev/mmcblk0p1 /media/mmc1/
cd /media/mmc1/
# Add optargs=video=HDMI-A-1:640x480@60 to uEnv.txt to use the pico DLP

# Turn off storage gadget, turn on network at boot time.
cd /lib/systemd/system/basic.target.wants
rm storage-gadget-init.service
ln -s ../network-gadget-init.service .

opkg install alsa-dev
cd /usr/lib
ln -s libasound.so.2.0.0 libasound.so  # I don't know why this link is mising

opkg install i2c-tools-dev

# Make date and time correct.
# http://derekmolloy.ie/automatically-setting-the-beaglebone-black-time-using-ntp/
opkg install ntp
Edit /lib/systemd/system/dtpdate.service
  ExecStart=/usr/bin/ntpd -q -g -x
systemctl enable ntpdate.service  # Seems to interfere with the USB-ethernet
systemctl enable ntpd.service
rm /etc/localtime
beagle$ ln -s /usr/share/zoneinfo/America/New_York /etc/localtime

# Here are some things I've had to do in the past, but don't now
# opkg install gcc gcc-symlinks libgcc-s-dev -force-overwrite
# This may do the gcc install too.
# beagle$ opkg install task-sdk-target (took about 8 minutes)
# Also did
# beagle$ opkg install evtest
# Here's what's needed to run the Flot demo
# beagle$ opkg install nodejs          (took about 1 minute)
# beagle$ opkg install alsa-utils      (took about 1 minute)
