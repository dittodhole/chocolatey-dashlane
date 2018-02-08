$packageName = 'dashlane'
$installerType = 'exe'
$silentArgs = '/SD'
$url = 'https://d3qm0vl2sdkrc.cloudfront.net/releases/5.6.0/5.6.0.15520/release/DashlaneInst.exe'
$checksum = 'a200eed235bc59810b35bff27636312d52c01796'
$checksumType = 'sha1'
$validExitCodes = @(0,1223)

Install-ChocolateyPackage -PackageName "$packageName" `
                          -FileType "$installerType" `
                          -SilentArgs "$silentArgs" `
                          -Url "$url" `
                          -ValidExitCodes $validExitCodes `
                          -Checksum "$checksum" `
                          -ChecksumType "$checksumType"

Start-Sleep -Seconds 20

Get-Process -Name "Dashlane*" | foreach {
  Write-Host "Stopping $($_.ProcessName) process ($($_.Id)) ..."
  Stop-Process $_
}