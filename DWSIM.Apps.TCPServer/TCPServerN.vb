'    DWSIM Network TCP Flowsheet Solver Server & Auxiliary Functions
'    Copyright 2015 Daniel Wagner O. de Medeiros
'
'    This file is part of DWSIM.
'
'    DWSIM is free software: you can redistribute it and/or modify
'    it under the terms of the GNU General Public License as published by
'    the Free Software Foundation, either version 3 of the License, or
'    (at your option) any later version.
'
'    DWSIM is distributed in the hope that it will be useful,
'    but WITHOUT ANY WARRANTY; without even the implied warranty of
'    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
'    GNU General Public License for more details.
'
'    You should have received a copy of the GNU General Public License
'    along with DWSIM.  If not, see <http://www.gnu.org/licenses/>.

Imports System.IO
Imports System.Net
Imports System.Net.Sockets
Imports System.Threading
Imports System.Threading.Tasks
Imports DWSIM
Imports System.Reflection
Imports System.Runtime.Serialization.Formatters.Binary
Imports System.Text

Module TCPServer

    Private server As TcpComm.Server
    Private lat As TcpComm.Utilities.LargeArrayTransferHelper

    Private solutions As Dictionary(Of String, Byte())

    Dim ts As CancellationTokenSource

    Public Sub Main()
        Dim server As TcpListener
        server = Nothing
        Try
            ' Set the TcpListener on port 13000.
            'Dim indexedByte() As Object
            Dim port As Int32 = 13000
            Dim localAddr As IPAddress = IPAddress.Parse("127.0.0.1")
            server = New TcpListener(localAddr, port)

            ' Start listening for client requests.
            server.Start()

            ' Buffer for reading data
            Dim bytes(1024) As Byte
            Dim index(4) As Byte
            Dim readData As New List(Of Array)
            Dim data As String = Nothing
            Dim ffText As String = Nothing
            ' Enter the listening loop.
            While True
                Console.Write("Waiting for a connection... ")

                ' Perform a blocking call to accept requests.
                ' You could also use server.AcceptSocket() here.
                Dim client As TcpClient = server.AcceptTcpClient()
                Console.WriteLine("Connected!")

                data = Nothing
                ffText = Nothing
                ' Get a stream object for reading and writing
                Dim stream As NetworkStream = client.GetStream()
                Dim solution() As Byte = Nothing
                Dim i As Int32
                Dim fullFileData As StringBuilder = New StringBuilder()
                ' Loop to receive all the data sent by the client.
                'i = stream.Read(index, 0, 4)
                'i = stream.Read(bytes, 0, bytes.Length)
                'indexedByte = {index, bytes}
                'readData.Add(indexedByte)
                'data = System.Text.Encoding.UTF8.GetString(bytes, 4, i)
                'Console.WriteLine("Received: {0}", System.Text.Encoding.UTF8.GetString(bytes))
                'Dim problemFile() As Byte = bytes.Clone
                Dim fullFile() As Byte = Nothing
                Do '(i <> 0)
                    ' Translate data bytes to a ASCII string.


                    ' Process the data sent by the client.
                    'Dim msg As Byte() = System.Text.Encoding.ASCII.GetBytes(data)

                    ' Send back a response.
                    'stream.Write(msg, 0, msg.Length)
                    'Console.WriteLine("Sent: {0}", data)

                    'Console.WriteLine("Sent: {0}", ffText)
                    'i = stream.Read(index, 0, 4)
                    i = stream.Read(bytes, 0, bytes.Length)
                    'indexedByte = {index, bytes}
                    'readData.Add(indexedByte)
                    data = System.Text.Encoding.UTF8.GetString(bytes, 0, i)
                    Console.WriteLine("Recieved: {0}", data)
                    fullFileData.Append(data)
                    'Console.WriteLine("index: {0}, Packet: {1}", System.Text.Encoding.UTF8.GetString(index), System.Text.Encoding.UTF8.GetString(bytes))
                    'fullFile = problemFile.Concat(bytes).ToArray()
                    'problemFile = fullFile

                Loop While stream.DataAvailable
                'i = 0
                'While i < readData.Count
                '    Dim packetIndex As Int32
                '    For Each packet As Array In readData
                '        If packet(0).SequenceEqual(BitConverter.GetBytes(i)) Then
                '            fullFile.Append(packet(1))
                '            i += 1
                '            packetIndex = readData.IndexOf(packet)
                '            Exit For
                '        End If
                '    Next
                '    readData.RemoveAt(packetIndex)
                'End While
                'ffText = System.Text.Encoding.ASCII.GetString(fullFile)
                Console.WriteLine(ControlChars.Cr + " Press Enter to continue...")
                Console.Read()
                Console.WriteLine("{0}", System.Text.Encoding.UTF8.GetString(System.Text.Encoding.UTF8.GetBytes(fullFileData.ToString)))
                bytes = System.Text.Encoding.UTF8.GetBytes(fullFileData.ToString)
                Using bytestream As New MemoryStream(System.Text.Encoding.UTF8.GetBytes(fullFileData.ToString))
                    Using form As FormFlowsheet = DWSIM.UnitOperations.UnitOperations.Flowsheet.InitializeFlowsheet(bytestream, New FormFlowsheet)
                        If Not solutions.ContainsKey(form.Options.Key) Then
                            DWSIM.FlowsheetSolver.FlowsheetSolver.SolveFlowsheet(form, 1, ts)
                            Dim retbytes As MemoryStream = DWSIM.UnitOperations.UnitOperations.Flowsheet.ReturnProcessData(form)
                            Using retbytes
                                Dim uncompressedbytes As Byte() = retbytes.ToArray
                                Using compressedstream As New MemoryStream()
                                    Using gzs As New BufferedStream(New Compression.GZipStream(compressedstream, Compression.CompressionMode.Compress, True), 64 * 1024)
                                        gzs.Write(uncompressedbytes, 0, uncompressedbytes.Length)
                                        gzs.Close()
                                        solution = compressedstream.ToArray
                                        stream.Write(solution, 0, solution.Length)
                                    End Using
                                End Using
                            End Using
                        End If
                        'lat.SendArray(solutions(form.Options.Key), 100, sessionid, errmsg)
                        Console.WriteLine("[" & Date.Now.ToString & "] " & "Byte array length: " & solutions(form.Options.Key).Length)
                    End Using
                End Using
                'Shutdown And end connection
                client.Close()

            End While
        Catch e As SocketException
            Console.WriteLine("SocketException: {0}", e)
        Finally
            server.Stop()
        End Try

        Console.WriteLine(ControlChars.Cr + "Hit enter to continue....")
        Console.Read()
    End Sub

    Public Sub Process(ByVal bytes() As Byte)

        ' Use TcpComm.Utilities.LargeArrayTransferHelper to make it easier to send and receive 
        ' large arrays sent via lat.SendArray()
        ' The LargeArrayTransferHelperb will assemble any number of incoming large arrays
        ' on any channel or from any sessionId, and pass them back to this callback
        ' when they are complete. Returns True if it has handled this incomming packet,
        ' so we exit the callback when it returns true.
        If ts Is Nothing Then ts = New CancellationTokenSource
        Dim ct As CancellationToken = ts.Token
        Dim errmsg As String = ""
        Console.WriteLine("[" & Date.Now.ToString & "] " & "Data received, flowsheet solving started!")
        Task.Factory.StartNew(Sub()
                                  ProcessData(bytes)
                              End Sub, ct, TaskCreationOptions.LongRunning).ContinueWith(Sub(t)
                                                                                             If Not t.Exception Is Nothing Then
                                                                                                 Console.WriteLine("[" & Date.Now.ToString & "] " & "Error solving flowsheet: " & t.Exception.ToString)
                                                                                                 errmsg = ""
                                                                                             ElseIf t.IsCanceled Then
                                                                                                 Console.WriteLine("[" & Date.Now.ToString & "] " & "Calculation aborted.")
                                                                                                 errmsg = ""
                                                                                             End If
                                                                                         End Sub,
                                                        TaskContinuationOptions.OnlyOnFaulted).ContinueWith(Sub()
                                                                                                                Console.WriteLine("[" & Date.Now.ToString & "] " & "Closing current session.")
                                                                                                                errmsg = ""
                                                                                                                ts.Dispose()
                                                                                                                ts = Nothing
                                                                                                            End Sub)

    End Sub

    Sub ProcessData(bytes As Byte())
        Dim errmsg As String = ""
        Using bytestream As New MemoryStream(bytes)
            Using form As FormFlowsheet = DWSIM.UnitOperations.UnitOperations.Flowsheet.InitializeFlowsheet(bytestream, New FormFlowsheet)
                If Not solutions.ContainsKey(form.Options.Key) Then
                    DWSIM.FlowsheetSolver.FlowsheetSolver.SolveFlowsheet(form, 1, ts)
                    Dim retbytes As MemoryStream = DWSIM.UnitOperations.UnitOperations.Flowsheet.ReturnProcessData(form)
                    Using retbytes
                        Dim uncompressedbytes As Byte() = retbytes.ToArray
                        Using compressedstream As New MemoryStream()
                            Using gzs As New BufferedStream(New Compression.GZipStream(compressedstream, Compression.CompressionMode.Compress, True), 64 * 1024)
                                gzs.Write(uncompressedbytes, 0, uncompressedbytes.Length)
                                gzs.Close()
                                solutions.Add(form.Options.Key, compressedstream.ToArray)
                            End Using
                        End Using
                    End Using
                End If
                'lat.SendArray(solutions(form.Options.Key), 100, sessionid, errmsg)
                Console.WriteLine("[" & Date.Now.ToString & "] " & "Byte array length: " & solutions(form.Options.Key).Length)
            End Using
        End Using
    End Sub


End Module
